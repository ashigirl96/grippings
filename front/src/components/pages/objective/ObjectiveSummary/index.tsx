import { useCallback, useMemo, VFC } from 'react'
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Progress,
  Spacer,
  Link,
  Button,
  Checkbox,
} from '@chakra-ui/react'
import { StarIcon as StarOutlineIcon } from '@heroicons/react/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/solid'
import {
  Objectives,
  useGetObjectiveTasksQuery,
  useUpdateTaskDoneMutation,
} from '@/generated/graphql'
import NextLink from 'next/link'

type Props = {
  objective: Objectives
}
export const ObjectiveSummary: VFC<Props> = ({
  objective: { title, id, favorite, tasks },
}) => {
  const { loading, error, data, fetchMore } = useGetObjectiveTasksQuery({
    variables: {
      id,
    },
  })
  const [updateTaskDone, updateTaskDoneResult] = useUpdateTaskDoneMutation()
  const changeDone = useCallback(
    async (done: boolean) => {
      await updateTaskDone({ variables: { id, done } })
      await fetchMore({ variables: { id } })
    },
    [fetchMore, id, updateTaskDone],
  )

  const firstTask = tasks[0]
  const action = firstTask.action
  const done = firstTask.done

  if (loading) {
    return <Box>is loading...</Box>
  }

  return (
    <Box boxShadow={'dark-lg'} rounded={'md'} width={'100%'}>
      <NextLink href={`objective/${id}`}>
        <Link>
          <HStack>
            <Spacer />
            <Heading size={'md'}>{title}</Heading>
            <Spacer />
            <IconButton
              _focus={{ outline: 'none' }}
              aria-label={'fav'}
              icon={
                favorite ? (
                  <StarSolidIcon width={'1rem'} height={'1rem'} />
                ) : (
                  <StarOutlineIcon width={'1rem'} height={'1rem'} />
                )
              }
            />
          </HStack>
          <Progress
            hasStripe
            rounded={'md'}
            borderColor={'gray.500'}
            value={90}
            colorScheme={'twitter'}
            bg={'twitter.50'}
            mx={10}
            my={5}
            height={5}
            isAnimated
          />
          <Button
            onClick={(e) => {
              e.preventDefault()
              changeDone(true)
            }}
          >
            <Checkbox
              _focus={{ outline: 'none' }}
              isChecked={done}
              mr={'8px'}
              colorScheme={'teal'}
              disabled={updateTaskDoneResult.loading}
            />
            <Box textDecoration={done && 'line-through'}>{action}</Box>
          </Button>
        </Link>
      </NextLink>
    </Box>
  )
}
