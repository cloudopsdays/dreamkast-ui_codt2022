import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '../../../components/Layout'
import { TrackView } from '../../../components/Track'
import {
  Track,
  TrackApi,
  Configuration,
  ProfileApi,
  Profile,
  Event,
  EventApi,
} from '../../../client-axios'

const IndexPage: React.FC = () => {
  const router = useRouter()
  const [eventAbbr, setEventAbbr] = useState<string>('')

  // States
  const [selectedTrack, setSelectedTrack] = useState<Track>()
  const [profile, setProfile] = useState<Profile>()
  const [event, setEvent] = useState<Event>()

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

  const getProfile = useCallback(async () => {
    if (eventAbbr == '') {
      return
    }
    const api = new ProfileApi(
      new Configuration({ basePath: window.location.origin }),
    )
    const res = await api
      .apiV1EventAbbrMyProfileGet(eventAbbr)
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          const topUrl = window.location.href.replace('/ui', '')
          window.location.href = topUrl
        }
      })
    if (!res) return
    setProfile(res.data)
  }, [eventAbbr])

  const getTracks = useCallback(async () => {
    if (eventAbbr == '') {
      return
    }
    const api = new TrackApi(
      new Configuration({ basePath: window.location.origin }),
    )
    const { data } = await api.apiV1TracksGet(eventAbbr)
    setSelectedTrack(data[0])
  }, [eventAbbr])

  useEffect(() => {
    if (eventAbbr != '') {
      getEvent()
      getProfile()
      getTracks()
    }
  }, [eventAbbr])

  if (!!event) {
    return (
      <Layout title={event.name} event={event}>
        <TrackView
          event={event}
          profile={profile}
          selectedTrack={selectedTrack}
        />
      </Layout>
    )
  } else {
    return <div></div>
  }
}

export default IndexPage
