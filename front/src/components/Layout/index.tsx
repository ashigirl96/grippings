import { FC } from 'react'
import {
  Box,
  DarkMode,
  Flex,
  Heading,
  IconButton,
  Spacer,
  VStack,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

type Props = {
  objectiveTitle?: string
}
export const Layout: FC<Props> = ({ objectiveTitle, children }) => {
  return (
    <DarkMode>
      <Box height={'100vh'}>
        <Flex p={'24px'} justifyContent={'space-between'} align={'center'}>
          <Heading size="xl">GRIPPINGs</Heading>
          <Spacer />
          <Heading size="md">{objectiveTitle ? objectiveTitle : ''}</Heading>
          <Spacer />
          <IconButton
            variant={'outline'}
            colorScheme={'teal'}
            fontSize={'20px'}
            icon={<AddIcon />}
            aria-label={'add'}
          />
        </Flex>
        <VStack>
          <Box width={'50%'}>{children}</Box>
        </VStack>
      </Box>
    </DarkMode>
  )
}
