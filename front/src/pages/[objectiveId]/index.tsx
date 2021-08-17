import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useGetObjectiveTasksQuery } from '@/generated/graphql'

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

  return <div className="bg-green-400">Hello</div>
}

export default ObjectivePage
