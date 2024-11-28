import './AccountStatistics.css';

function AccountStatistics({stats}) {
  return (
  <div className="user-stats">
    <div className="stat-item">
    <span className="stat-value">{stats.followers}</span>
    <span className="stat-title">Followers</span>
    </div>
    <div className="stat-item">
    <span className="stat-value">{stats.trips}</span>
    <span className="stat-title">Trips Done</span>
      
    </div>
    <div className="stat-item">
      <span className="stat-value">{stats.following}</span>
      <span className="stat-title">Following</span>
    </div>
  </div>
  );
}
export default AccountStatistics;