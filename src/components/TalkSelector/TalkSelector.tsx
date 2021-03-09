import React, { useEffect, useState } from 'react'
import * as Styled from './styled'
import { Talk } from '../../client-axios'
import dayjs from 'dayjs'

type Props = {
  selectedTrackId?: number
  selectedTalk?: Talk
  talks: Talk[]
  selectTalk: (talk: Talk) => void
}

interface TalkWithAvailable extends Talk {
  available: boolean
}

export const TalkSelector: React.FC<Props> = ({
  selectedTrackId,
  selectedTalk,
  talks,
  selectTalk,
}) => {
  const [talksWithAvailableState, setTalksWithAvailableState] = useState<
    TalkWithAvailable[]
  >([])
  const [now, setNow] = useState<number>(dayjs().unix())
  const [id, setId] = useState<number>()

  useEffect(() => {
    if (!process.browser) return
    setId(
      window.setInterval(() => {
        setNow(dayjs().unix())
      }, 1000),
    )
    return window.clearInterval(id)
  }, [])

  useEffect(() => {
    setTalksWithAvailableState(
      sortTalks(talks).map((talk) => {
        return { ...talk, available: now - dayjs(talk.startTime).unix() >= 0 }
      }),
    )
  }, [talks, now])

  const sortTalks = (talks: Talk[]): Talk[] => {
    return talks.sort((n1, n2) => {
      if (n1.startTime > n2.startTime) {
        return 1
      }

      if (n1.startTime < n2.startTime) {
        return -1
      }

      return 0
    })
  }

  return (
    <Styled.Container>
      <Styled.Title>このトラックのセッション</Styled.Title>
      <Styled.List>
        {talksWithAvailableState.map((talk) => {
          if (talk.trackId == selectedTrackId) {
            return (
              <Styled.Item
                button
                key={talk.id}
                disabled={!talk.available}
                selected={talk.id === selectedTalk?.id}
                onClick={() => selectTalk(talk)}
              >
                <Styled.Text>
                  {talk.onAir && <Styled.Live>LIVE</Styled.Live>}{' '}
                  {dayjs(talk.startTime).format('HH:mm')}-
                  {dayjs(talk.endTime).format('HH:mm')}
                  <br />
                  {talk.title}
                </Styled.Text>
              </Styled.Item>
            )
          }
        })}
      </Styled.List>
    </Styled.Container>
  )
}
