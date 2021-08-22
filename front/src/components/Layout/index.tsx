import { FC, ReactNode } from 'react'
import {
  Box,
  Button,
  DarkMode,
  Flex,
  Heading,
  IconButton,
  Spacer,
  VStack,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

type Props = {
  objectiveTitle?: ReactNode
}
export const Layout: FC<Props> = ({ objectiveTitle, children }) => {
  return (
    <DarkMode>
      <Box height={'100vh'}>
        <Flex p={'24px'} justifyContent={'space-between'} align={'center'}>
          <Button as="a" href={`/`} _focus={{ outline: 'none' }}>
            <Heading size="xl">GRIPPINGs</Heading>
          </Button>
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
