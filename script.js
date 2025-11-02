async function atualizarDashboard() {
  try {
    const response = await fetch('data.json?nocache=' + new Date().getTime());
    const data = await response.json();

    document.getElementById("saldo").textContent = `$${data.saldo_total.toFixed(2)} USDT`;
    document.getElementById("lucro").textContent = `+${data.lucro_percent.toFixed(2)}%`;
    document.getElementById("ciclo").textContent = `#${data.ciclo}`;
    document.getElementById("atualizacao").textContent = new Date(data.ultima_atualizacao).toLocaleString();

    const logsEl = document.getElementById("logs");
    logsEl.innerHTML = "";
    data.logs.slice(-10).reverse().forEach(log => {
      const li = document.createElement("li");
      li.textContent = `[${log.hora}] ${log.mensagem}`;
      logsEl.appendChild(li);
    });

  } catch (err) {
    console.error("Erro ao atualizar dashboard:", err);
  }
}

setInterval(atualizarDashboard, 30000);
atualizarDashboard();
