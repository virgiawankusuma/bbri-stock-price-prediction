// Fungsi untuk hitung quantile
function quantile(arr, q) {
  const sorted = arr.slice().sort((a, b) => a - b);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  } else {
    return sorted[base];
  }
}

// Fungsi utama menerima data JSON langsung
export function historicalBBRIStockData(data) {
  try {
    const result = data.chart.result[0];
    const timestamps = result.timestamp;
    const quote = result.indicators.quote[0];

    const dates = timestamps.map(ts => new Date(ts * 1000).toISOString().split('T')[0]);

    let df = dates.map((date, i) => ({
      Date: date,
      Open: quote.open[i],
      High: quote.high[i],
      Low: quote.low[i],
      Close: quote.close[i],
      Volume: quote.volume[i],
      AdjustedClose: result.indicators?.adjclose?.[0]?.adjclose?.[i] ?? quote.close[i],
    }));

    // Filter data valid
    df = df.filter(row =>
      [row.Open, row.High, row.Low, row.Close, row.Volume, row.AdjustedClose].every(v => v != null && !isNaN(v))
    );

    // Deteksi dan pembatasan outlier
    const numCols = ['Open', 'High', 'Low', 'Close', 'Volume', 'AdjustedClose'];
    for (const col of numCols) {
      const values = df.map(row => row[col]);
      const Q1 = quantile(values, 0.25);
      const Q3 = quantile(values, 0.75);
      const IQR = Q3 - Q1;
      const upper = Q3 + 1.5 * IQR;
      const lower = Q1 - 1.5 * IQR;

      for (let row of df) {
        if (row[col] > upper) row[col] = upper;
        else if (row[col] < lower) row[col] = lower;
      }
    }

    // Fitur lagging
    for (let i = 0; i < df.length; i++) {
      df[i]['Close_Lag_1'] = i > 0 ? df[i - 1].Close : null;
      df[i]['Close_Lag_2'] = i > 1 ? df[i - 2].Close : null;
      df[i]['Close_Lag_3'] = i > 2 ? df[i - 3].Close : null;
    }

    // Daily return
    for (let i = 0; i < df.length; i++) {
      df[i]['Daily_Return'] = i > 0 ? (df[i].Close - df[i - 1].Close) / df[i - 1].Close : null;
    }

    // Moving average
    const movingAverage = (data, window) => {
      return data.map((_, i) => {
        if (i < window - 1) return null;
        const slice = data.slice(i - window + 1, i + 1);
        const sum = slice.reduce((acc, val) => acc + val, 0);
        return sum / window;
      });
    };

    const closeValues = df.map(row => row.Close);
    const ma7 = movingAverage(closeValues, 7);
    const ma30 = movingAverage(closeValues, 30);

    for (let i = 0; i < df.length; i++) {
      df[i]['MA_7'] = ma7[i];
      df[i]['MA_30'] = ma30[i];
    }

    // console.log("Data BBRI selesai diproses:");
    // console.log(df.slice(-5));

    // return df;
    return {
      dateRange: {
        start: df[0]?.Date ?? null,
        end: df[df.length - 1]?.Date ?? null,
      },
      data: df,
    };

  } catch (err) {
    console.error("Gagal memproses data:", err.message);
  }
}
