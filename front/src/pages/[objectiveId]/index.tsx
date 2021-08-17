import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useGetObjectiveQuery } from '@/generated/graphql'

const ObjectivePage: NextPage = () => {
  const router = useRouter()
  const { objectiveId } = router.query

  const { loading, error, data } = useGetObjectiveQuery({
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

  return <div>{JSON.stringify(data)}</div>
}

export default ObjectivePage