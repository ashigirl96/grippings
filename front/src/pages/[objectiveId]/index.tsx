import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useGetObjectiveTasksQuery } from '@/generated/graphql'
import { Layout } from '@/components'
import {
  ButtonGroup,
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Input,
  Spacer,
  useEditableControls,
} from '@chakra-ui/react'
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'

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

  /* Here's a custom control */
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()

    return (
      <Flex>
        {isEditing ? (
          <ButtonGroup size="sm">
            <IconButton
              aria-label={''}
              icon={<CheckIcon />}
              {...getSubmitButtonProps()}
            />
            <IconButton
              aria-label={''}
              icon={<CloseIcon />}
              {...getCancelButtonProps()}
            />
          </ButtonGroup>
        ) : (
          <Flex>
            <IconButton
              aria-label={''}
              size="sm"
              icon={<EditIcon />}
              {...getEditButtonProps()}
            />
          </Flex>
        )}
      </Flex>
    )
  }

  return (
    <Layout>
      <div className="shadow-md space-y-3 self-stretch p-10">
        {data.objectives_by_pk.tasks.map((task) => (
          <Flex>
            <Checkbox isChecked={task.done} />
            <Editable
              value={task.action}
              isPreviewFocusable={false}
              width="100%"
              colorScheme={'pink'}
            >
              <Flex>
                <EditablePreview />
                <EditableInput className="outline-none" />
                <Spacer />
                <EditableControls />
              </Flex>
            </Editable>
          </Flex>
        ))}
      </div>
    </Layout>
  )
}

export default ObjectivePage
