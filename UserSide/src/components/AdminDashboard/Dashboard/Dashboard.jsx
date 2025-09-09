import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './Dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ipoDashData = [
  { label: 'IPO in Gain', value: 20, color: '#2FBFDE' },
  { label: 'IPO in Loss', value: 9, color: '#6463D6' },
  { label: 'Total IPO', value: 30, color: '#F99C30' }
];

const doughnutData = {
  labels: ['Upcomming', 'New Listed', 'Ongoing'],
  datasets: [
    {
      label: 'Main Board IPO',
      data: [15, 25, 10],
      backgroundColor: ['#5A6ACF', '#8593ED', '#C7CEFF'],
      borderColor: '#fff',   
      borderWidth: 0
    },
  ],
};

const doughnutOptions = {
  cutout: '75%',
  plugins: {
    legend: {
      display: false,
      position: 'right',
      labels: { color: '#333', font: { size: 10 } }
    },
    title: { display: true },
    tooltip: { enabled: true }
  }
};

function Dashboard() {
  return (
    <div className="dashboard-container">

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Summary and Charts */}
        <section className="dashboard-content">
          <div className="dashboard-left">
            <div className="ipo-dashboard-summary">
              <h3>IPO Dashboard India</h3>
              <div className="ipo-gain-status">
                <span className="ipo-gain-arrow">&#8593;</span>
                <span className="ipo-gain-value">{ipoDashData[0].value} IPO in Gain</span>
              </div>
              <div className="ipo-bubbles">
                {ipoDashData.map((item, idx) => (
                  <div
                    key={idx}
                    className={`bubble bubble-${idx}`}
                    style={{ backgroundColor: item.color }}
                  >
                    <span className="bubble-value">{item.value}</span>
                    <span className="bubble-label">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="dashboard-links">
            <h4>Quick Links</h4>
            <ul>
              <li><img src="../nse.svg" alt="" className='ico'/>NSE India <a href='https://www.nseindia.com' className="visit">Visit Now</a></li>
              <li><img src="../bse-icon.svg" alt="" className='ico'/>BSE India <a href='https://www.bseindia.com' className="visit">Visit Now</a></li>
              <li><img src="../sebi-icon.svg" alt="" className='ico'/>SEBI <a href='https://www.sebi.gov.in' className="visit">Visit Now</a></li>
              <li><img src="../moneycontrol.svg" alt="" className='ico'/>Money Control <a href='https://www.moneycontrol.com' className="visit">Visit Now</a></li>
            </ul>
          </div>

          <div className="dashboard-right">
            <div className="main-board-ipo">
              <div className="main-board-header">
                <h4>Main Board IPO</h4>
                <button className="report-btn">View Report</button>
              </div>
              <span className="board-date">From 01 Jan 2024</span>
              <div className='doughbar'>
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
              <div className="donut-legend">
                <span><span className="legend-dot upcomming"></span>Upcomming {doughnutData.datasets[0].data[0]} </span>
                <span><span className="legend-dot newlisted"></span>New Listed {doughnutData.datasets[0].data[1]}</span>
                <span><span className="legend-dot ongoing"></span>Ongoing {doughnutData.datasets[0].data[2]}</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
