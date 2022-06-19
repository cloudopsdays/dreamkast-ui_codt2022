import React from 'react'
import * as Styled from './styled'
import { Grid } from '@material-ui/core'

type Props = {
  urls?: Array<string>
}

const AttachmentVimeos: React.FC<Props> = ({ urls }) => {
  return (
    <Grid item xs={12}>
      {urls?.map((url) => {
        return (
          <Styled.VimeoContainer>
            <Styled.VimeoIframe
              src={url}
              width="100%"
              height="360"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></Styled.VimeoIframe>
          </Styled.VimeoContainer>
        )
      })}
    </Grid>
  )
}

export default AttachmentVimeos
