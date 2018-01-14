const BANK_INT = 4;
const FD_INT = 6.75;


function ci(p, r, t) {
  return p * Math.pow((1 + r / 100), t)
}

function comparisonChart(ctx, mf, bank, fd, years){
  return new Chart(ctx, {
      type: 'line',

      data: {
        labels: years,
        datasets: [
          {
              label: "Mutual Funds",
              borderColor: '#0074D9',
              fill: false,
              data: mf,
          },
          {
              label: "Fixed Deposit " + FD_INT.toString() + "%",
              borderColor: '#39CCCC',
              fill: false,
              data: fd,
          },
          {
              label: "Bank Savings " + BANK_INT.toString() + "%",
              borderColor: '#FF4136',
              fill: false,
              data: bank,
          }
        ]
      },

      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
}

function compoundChart(ctx, principal, interest, years){
  return new Chart(ctx, {
    type: 'bar',

    data: {
      labels: years,
      datasets: [
        {
            label: "Principal",
            backgroundColor: "#0074D9",
            data: principal,
        },
        {
            label: "Interest",
            backgroundColor: "#39CCCC",
            data: interest,
        },
      ]
    },

    options: {
        scales: {
            xAxes: [{
              stacked: true
            }],
            yAxes: [{
              ticks: {
                  beginAtZero: true
              },
              stacked: true
            }]
        }
    }
  });
}

function draw(event) {
  var ctx = document.getElementById('myChart').getContext('2d');

  var principal = parseInt(document.getElementById('principal').value);
  var mf_int = parseInt(document.getElementById('interest').value);
  var period = parseInt(document.getElementById('period').value);

  var curr_year = new Date().getFullYear();
  var years = [];
  for(i=0;i<=period;i++)
    years.push(curr_year + i)

  if(chart != null)
    chart.destroy();

  var graph = document.getElementById('graph').value;

  if(graph == 'comparison'){
    var mf = [];
    var bank = [];
    var fd = [];

    for(i=0;i<=period;i++)
    {
      mf.push(ci(principal, mf_int, i));
      bank.push(ci(principal, BANK_INT, i));
      fd.push(ci(principal, FD_INT, i));
    }
    chart = comparisonChart(ctx, mf, bank, fd, years);
  }
  else if(graph == 'compound'){
    var p = [principal];
    var interest = [0];

    for(i=1;i<=period;i++)
    {
      let x = ci(principal, mf_int, i-1)
      p.push(x);
      interest.push(ci(principal, mf_int, i) - x)
    }
    chart = compoundChart(ctx, p, interest, years);
  }

}

var chart = null;

document.getElementById('principal').addEventListener('focusout', draw);
document.getElementById('interest').addEventListener('click', draw);
document.getElementById('period').addEventListener('change', draw);
document.getElementById('graph').addEventListener('change', draw);

window.onload = draw;
