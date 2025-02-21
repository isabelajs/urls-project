interface DashboardProps {
    onLogout: () => void
  }

function Dashboard({ onLogout }: DashboardProps) {
return (
    <div>
    <h2>Dashboard</h2>
    <p>Welcome to your dashboard!</p>
    <button onClick={onLogout}>Logout</button>
    </div>
)
}

export default Dashboard