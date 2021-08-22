import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useGetObjectiveTasksQuery } from '@/generated/graphql'
import { Layout } from '@/components'
import { Button, Link } from '@chakra-ui/react'
import { sortBy } from 'lodash'
import { useCallback, useMemo } from 'react'
import { Task } from '@/components/pages/objective'

const ObjectivePage: NextPage = () => {
  const router = useRouter()
  const { objectiveId } = router.query

  const { loading, error, data, fetchMore } = useGetObjectiveTasksQuery({
    variables: {
      id: objectiveId as string,
    },
  })

  const _tasks = data && data.objectives_by_pk && data.objectives_by_pk.tasks

  const tasks = useMemo(() => {
    if (_tasks) {
      return sortBy(_tasks, [
        (task) => {
          return new Date(task.created_at).getTime()
        },
      ])
    }
    return []
  }, [_tasks])

  const fetchTasks = useCallback(async () => {
    await fetchMore({ variables: { id: objectiveId as string } })
  }, [fetchMore, objectiveId])

  if (loading) {
    return <p>...loading.</p>
  }

  if (error) {
    return <p>{error.toString()}</p>
  }

  return (
    <Layout
      objectiveTitle={
        <Button as="a" href={`/objective/${objectiveId}`}>
          {data.objectives_by_pk.title}
        </Button>
      }
    >
      <Task>
        {tasks.map((task) => (
          <Task.Preview task={task} fetchTasks={fetchTasks} />
        ))}
        <Task.New objectiveId={objectiveId as string} fetchTasks={fetchTasks} />
      </Task>
    </Layout>
  )
}

export default ObjectivePage
