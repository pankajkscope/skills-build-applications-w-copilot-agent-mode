import { useEffect, useState } from 'react'
import { fetchApiList } from '../api'

const workoutsEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchApiList('workouts', workoutsEndpoint)
      .then((data) => {
        if (isMounted) {
          setWorkouts(data)
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
    return <p className="text-secondary">Loading workouts...</p>
  }

  if (status === 'error') {
    return <div className="alert alert-warning">{error}</div>
  }

  return (
    <div className="data-panel">
      <div className="panel-heading">
        <h1>Workouts</h1>
        <span className="metric">{workouts.length} plans</span>
      </div>
      <div className="grid-list">
        {workouts.map((workout) => (
          <article className="summary-card" key={workout._id ?? workout.title}>
            <div>
              <h2>{workout.title}</h2>
              <p>{workout.suggestedFor}</p>
            </div>
            <dl>
              <div>
                <dt>Focus</dt>
                <dd className="text-capitalize">{workout.focus}</dd>
              </div>
              <div>
                <dt>Difficulty</dt>
                <dd className="text-capitalize">{workout.difficulty}</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>{workout.durationMinutes} min</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Workouts
