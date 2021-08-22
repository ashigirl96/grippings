import { Preview } from './Preview'
import { New } from './New'
import { FC } from 'react'
import { VStack } from '@chakra-ui/react'

type Elements = {
  Preview: typeof Preview
  New: typeof New
}

export const Task: FC & Elements = ({ children }) => {
  return (
    <VStack
      align={'start'}
      rounded={'xl'}
      shadow={'xl'}
      p={'16px'}
      spacing={'16px'}
    >
      {children}
    </VStack>
  )
}

Task.New = New
Task.Preview = Preview
