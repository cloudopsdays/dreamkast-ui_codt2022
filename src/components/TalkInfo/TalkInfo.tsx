import React from 'react'
import * as Styled from './styled'
import { Talk } from '../../client-axios'

type Props = {
  selectedTalk?: Talk
  selectedTrackId?: number
}

export const TalkInfo: React.FC<Props> = ({ selectedTalk }) => {
  return (
    <Styled.OuterContainer>
      <Styled.Container>
        <Styled.Title>{selectedTalk?.title}</Styled.Title>
        <Styled.SpeakerContainer>
          <Styled.Speaker>
            {selectedTalk?.speakers
              .map((speaker) => {
                return speaker.name
              })
              .join(' / ')}
          </Styled.Speaker>
          <div style={{ paddingRight: '20px' }} />
          {selectedTalk?.documentUrl && (
            <Styled.DocsLink href={selectedTalk?.documentUrl} target="_blank">
              登壇資料はこちら
            </Styled.DocsLink>
          )}
        </Styled.SpeakerContainer>
        <Styled.Content>{selectedTalk?.abstract}</Styled.Content>
      </Styled.Container>
    </Styled.OuterContainer>
  )
}
