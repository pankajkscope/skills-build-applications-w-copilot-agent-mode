import { useEffect, useState } from 'react'
import { fetchApiList } from '../api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchApiList('activities')
      .then((data) => {
        if (isMounted) {
          setActivities(data)
          setStatus('ready')
        }
      })
      .catch((requestError) => {
        if (isMounted) {
          setError(requestError.message)
          setStatus('error')
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  if (status === 'loading') {
    return <p className="text-secondary">Loading activities...</p>
  }

  if (status === 'error') {
    return <div className="alert alert-warning">{error}</div>
  }

  return (
    <div className="data-panel">
      <div className="panel-heading">
        <h1>Activities</h1>
        <span className="metric">{activities.length} logged</span>
      </div>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Athlete</th>
              <th>Team</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Calories</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id ?? `${activity.userName}-${activity.completedAt}`}>
                <td>{activity.userName}</td>
                <td>{activity.teamName}</td>
                <td className="text-capitalize">{activity.type}</td>
                <td>{activity.durationMinutes} min</td>
                <td>{activity.caloriesBurned}</td>
                <td>{new Date(activity.completedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Activities
