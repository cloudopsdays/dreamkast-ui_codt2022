import { Layout } from '../../../../components/Layout'
import { BoothPage } from '../../../../components/BoothPage'
import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Configuration, Event, EventApi } from '../../../../client-axios'

const IndexPage: React.FC = () => {
  const router = useRouter()
  const [eventAbbr, setEventAbbr] = useState<string>('')
  const [event, setEvent] = useState<Event>()
  const [id, setId] = useState<string>()

  useEffect(() => {
    if (router.asPath !== router.route) {
      const { eventAbbr } = router.query
      setEventAbbr(eventAbbr as string)
    }
  }, [router])

  const getEvent = useCallback(async () => {
    if (eventAbbr == '') {
      return
    }

    const eventApi = new EventApi(
      new Configuration({ basePath: window.location.origin }),
    )
    const { data } = await eventApi.apiV1EventsEventAbbrGet(eventAbbr)
    setEvent(data)
  }, [eventAbbr])

  useEffect(() => {
    if (router.asPath !== router.route) {
      const { id } = router.query
      setId(id as string)
    }
  }, [router])

  useEffect(() => {
    if (eventAbbr != '') {
      getEvent()
    }
  }, [eventAbbr])

  if (!!event) {
    return (
      <Layout title={event.name} event={event}>
        <BoothPage boothId={id} />
      </Layout>
    )
  } else {
    return <div></div>
  }
}

export default IndexPage
