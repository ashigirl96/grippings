import { useCallback, useState, VFC } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Flex,
  IconButton,
  Input,
  Spacer,
} from '@chakra-ui/react'
import {
  Task,
  useDeleteTaskMutation,
  useUpdateTaskActionMutation,
  useUpdateTaskDoneMutation,
} from '@/generated/graphql'
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'

type Props = {
  task: Omit<Task, 'objectiveId'>
  fetchTasks: () => void
}
export const Preview: VFC<Props> = ({
  fetchTasks,
  task: { done, id, action: _action },
}) => {
  const [updateTaskDone, updateTaskDoneResult] = useUpdateTaskDoneMutation()
  const changeDone = useCallback(
    async (done: boolean) => {
      await updateTaskDone({ variables: { id, done } })
      fetchTasks()
    },
    [fetchTasks, id, updateTaskDone],
  )

  const [updateTaskAction] = useUpdateTaskActionMutation()
  const [isEdit, setIsEdit] = useState(false)
  const [action, setAction] = useState(_action)

  const onSubmitAction = useCallback(async () => {
    await updateTaskAction({
      variables: {
        id,
        action,
      },
    })
    fetchTasks()
  }, [action, fetchTasks, id, updateTaskAction])

  const [deleteTask] = useDeleteTaskMutation()

  return (
    <Flex width={'100%'} align={'center'}>
      {isEdit ? (
        <Input
          placeholder={'edit action'}
          value={action}
          onChange={(e) => setAction(e.currentTarget.value)}
        />
      ) : (
        <Button
          onClick={async () => await changeDone(!done)}
          _focus={{ outline: 'none' }}
        >
          <Checkbox
            _focus={{ outline: 'none' }}
            isChecked={done}
            mr={'8px'}
            colorScheme={'teal'}
            disabled={updateTaskDoneResult.loading}
          />
          <Box textDecoration={done && 'line-through'}>{_action}</Box>
        </Button>
      )}
      <Spacer />
      {isEdit ? (
        <ButtonGroup>
          <IconButton
            _focus={{ outline: 'none' }}
            aria-label={'ok'}
            size={'sm'}
            icon={<CheckIcon color={'teal'} />}
            onClick={async () => {
              setIsEdit((edit) => !edit)
              await onSubmitAction()
            }}
          />
          <IconButton
            _focus={{ outline: 'none' }}
            aria-label={'close'}
            size={'sm'}
            icon={<CloseIcon color={'red.500'} />}
            onClick={() => setIsEdit((edit) => !edit)}
          />
        </ButtonGroup>
      ) : (
        <ButtonGroup>
          <IconButton
            _focus={{ outline: 'none' }}
            aria-label={'delete'}
            size={'sm'}
            icon={<DeleteIcon color={'red.300'} />}
            onClick={async () => {
              await deleteTask({ variables: { id } })
              await fetchTasks()
            }}
          />
          <IconButton
            _focus={{ outline: 'none' }}
            aria-label={'edit'}
            size={'sm'}
            icon={<EditIcon color={'teal'} />}
            onClick={() => setIsEdit((edit) => !edit)}
          />
        </ButtonGroup>
      )}
    </Flex>
  )
}
