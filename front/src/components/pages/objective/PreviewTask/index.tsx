import { VFC } from 'react'
import { Box, Checkbox, Flex } from '@chakra-ui/react'
import { Task } from '@/generated/graphql'

type Props = {
  task: Task
}
export const PreviewTask: VFC<Props> = ({ task }) => {
  return (
    <Flex>
      <Checkbox isChecked={task.done} mr={'8px'} colorScheme={'teal'} />
      <Box textDecoration={task.done && 'line-through'}>{task.action}</Box>
    </Flex>
  )
}
