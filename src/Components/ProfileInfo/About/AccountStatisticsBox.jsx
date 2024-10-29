import './AccountStatisticsBox.css';
import AccountStatistics from './AccountStatistics.jsx';

function AccountStatisticsBox({stats}) {
  return (
    <div className='stats-box'>
      <div className='tittle-container'>
        <span className='info-container-tittle'>Accoount Statistics</span>
      </div>
      <div className='elevation'></div>
      <div className='stats'>
        <AccountStatistics stats={stats} />
      </div>

    </div>
 
  );
}
export default AccountStatisticsBox;