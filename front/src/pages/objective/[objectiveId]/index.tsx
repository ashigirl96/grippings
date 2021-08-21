import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useGetObjectiveTasksQuery } from '@/generated/graphql'
import { Layout } from '@/components'
import {
  Box,
  Checkbox,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VStack,
} from '@chakra-ui/react'
import { sortBy } from 'lodash'
import { useMemo } from 'react'

const ObjectivePage: NextPage = () => {
  const router = useRouter()
  const { objectiveId } = router.query

  const { loading, error, data } = useGetObjectiveTasksQuery({
    variables: {
      id: objectiveId as string,
    },
  })

  if (loading) {
    return <p>...loading.</p>
  }

  if (error) {
    return <p>{error.toString()}</p>
  }

  // TODO: useMemo直して
  const tasks = useMemo(() => {
    return sortBy(data.objectives_by_pk.tasks, [
      (task) => +task.updated_at,
    ]).reverse()
  }, [data.objectives_by_pk.tasks])

  return (
    <Layout objectiveTitle={data.objectives_by_pk.title}>
      <VStack
        align={'start'}
        rounded={'xl'}
        shadow={'xl'}
        p={'16px'}
        spacing={'16px'}
      >
        {tasks.map((task) => (
          <>
            <Flex>
              <Checkbox isChecked={task.done} mr={'8px'} colorScheme={'teal'} />
              <Box textDecoration={task.done && 'line-through'}>
                {task.action}
              </Box>
            </Flex>
          </>
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
