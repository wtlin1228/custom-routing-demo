import React from 'react'

const TOPIC_DATA = {
  math: {
    title: '數學',
    slug: '/junyi/math',
    child: ['1', '2', '3'],
  },
  english: {
    title: '英文',
    slug: '/junyi/english',
    child: ['A', 'B', 'C'],
  },
  chinese: {
    title: '國文',
    slug: '/junyi/chinese',
    child: ['ㄅ', 'ㄆ', 'ㄈ'],
  },
}

const getTopicData = (topicId) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(TOPIC_DATA[topicId])
    }, 300)
  })

function App() {
  const [topicId, setTopicId] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [isBackAndForward, setIsBackAndForward] = React.useState(false)
  const [topicData, setTopicData] = React.useState({
    title: '',
    slug: '/',
    child: [],
  })

  React.useEffect(() => {
    // if (topicId !== '' && !window.location.href.includes(`#`)) {
    if (topicId !== '') {
      console.log(
        `%c fetch topic **${topicId}**`,
        'background: #222; color: #bada55'
      )

      setIsLoading(true)
      getTopicData(topicId).then((data) => {
        setTopicData(data)
        setIsLoading(false)
      })
    }
  }, [topicId])

  React.useEffect(() => {
    const { slug, title } = topicData

    if (!isBackAndForward && slug !== '/') {
      console.log(
        `%c push state: ${title}, ${window.location.search}`,
        'background: #000000; color: #ff7444'
      )
      window.history.pushState('', title, `${slug}${window.location.search}`)
    }

    setIsBackAndForward(false)
  }, [topicData])

  React.useEffect(() => {
    window.onpopstate = () => {
      const pathSlice = window.location.pathname.split('/')
      if (pathSlice.length > 1) {
        const targetTopicId = pathSlice[pathSlice.length - 1]

        console.log(`on pop state: setTopicId(${targetTopicId})`)

        setTopicId(targetTopicId)
      }

      setIsBackAndForward(true)
    }
  })

  const handleNavigate = (topicId) => {
    setIsBackAndForward(false)
    setTopicId(topicId)
  }

  return (
    <div>
      <div>
        <button onClick={() => handleNavigate('math')}>math</button>
        <button onClick={() => handleNavigate('english')}>english</button>
        <button onClick={() => handleNavigate('chinese')}>chinese</button>
      </div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <div>
          <h1>{topicData.title}</h1>
          <h2>
            {topicData.child.map((x) => (
              <div key={x} id={x} style={{ height: 300 }}>
                <a href={`#${x}`}>{x}</a>
              </div>
            ))}
          </h2>
        </div>
      )}
    </div>
  )
}

export default App
