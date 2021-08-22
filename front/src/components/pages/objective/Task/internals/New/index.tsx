import { useState, VFC } from 'react'
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react'
import { usePostTaskMutation } from '@/generated/graphql'

type Props = {
  objectiveId: string
  fetchTasks: () => void
}
export const New: VFC<Props> = ({ objectiveId, fetchTasks }) => {
  const [action, setAction] = useState('')

  const [postTask, resultPostTask] = usePostTaskMutation()

  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        color="teal"
        fontSize="1.2em"
        children="+"
      />
      <Input
        disabled={resultPostTask.loading}
        onChange={(e) => setAction(e.currentTarget.value)}
        onKeyDown={async (e) => {
          if (e.key === 'Enter' && e.ctrlKey) {
            await postTask({ variables: { objectiveId, action } })
            await fetchTasks()
            setAction('')
          }
        }}
        wordBreak={'break-all'}
        placeholder="Add next action"
      />
      <InputRightElement children="⌃⏎" />
    </InputGroup>
  )
}
