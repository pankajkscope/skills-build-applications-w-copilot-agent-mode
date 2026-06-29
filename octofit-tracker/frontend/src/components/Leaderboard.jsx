import { useEffect, useState } from 'react'
import { fetchApiList } from '../api'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchApiList('leaderboard')
      .then((data) => {
        if (isMounted) {
          setEntries(data)
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
    return <p className="text-secondary">Loading leaderboard...</p>
  }

  if (status === 'error') {
    return <div className="alert alert-warning">{error}</div>
  }

  return (
    <div className="data-panel">
      <div className="panel-heading">
        <h1>Leaderboard</h1>
        <span className="metric">Top {entries.length}</span>
      </div>
      <div className="leaderboard-list">
        {entries.map((entry) => (
          <article className="rank-row" key={entry._id ?? entry.rank}>
            <span className="rank">#{entry.rank}</span>
            <div>
              <h2>{entry.userName}</h2>
              <p>{entry.teamName}</p>
            </div>
            <strong>{entry.points} pts</strong>
            <span>{entry.streakDays} day streak</span>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Leaderboard
