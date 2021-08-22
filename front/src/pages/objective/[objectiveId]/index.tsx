import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useGetObjectiveTasksQuery } from '@/generated/graphql'
import { Layout } from '@/components'
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VStack,
} from '@chakra-ui/react'
import { sortBy } from 'lodash'
import { useMemo } from 'react'
import { PreviewTask } from '@/components/pages/objective/PreviewTask'

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

  if (loading) {
    return <p>...loading.</p>
  }

  if (error) {
    return <p>{error.toString()}</p>
  }

  return (
    <Layout
      objectiveTitle={
        <Button
          onClick={async () =>
            await fetchMore({ variables: { id: objectiveId as string } })
          }
        >
          {data.objectives_by_pk.title}
        </Button>
      }
    >
      <VStack
        align={'start'}
        rounded={'xl'}
        shadow={'xl'}
        p={'16px'}
        spacing={'16px'}
      >
        {tasks.map((task) => (
          <PreviewTask
            task={task}
            fetchMore={() =>
              fetchMore({ variables: { id: objectiveId as string } })
            }
          />
        ))}
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="teal"
            fontSize="1.2em"
            children="+"
          />
          <Input wordBreak={'break-all'} placeholder="Add next action" />
          <InputRightElement children="⏎" />
        </InputGroup>
      </VStack>
    </Layout>
  )
}

export default ObjectivePage
