import { NextPage } from 'next'
import { Box, VStack } from '@chakra-ui/react'
import { Layout } from '@/components'
import { useGetObjectivesQuery } from '@/generated/graphql'
import { ObjectiveSummary } from '@/components/pages/objective'

const Index: NextPage = () => {
  const { data, error, loading } = useGetObjectivesQuery()

  if (loading) {
    return <Box>is loading..</Box>
  }

  if (error) {
    return <Box>{JSON.stringify(error)}</Box>
  }

  return (
    <Layout>
      <VStack spacing={100}>
        {data.objectives.map((objective) => (
          <ObjectiveSummary objective={objective} />
        ))}
      </VStack>
    </Layout>
  )
}

export default Index
