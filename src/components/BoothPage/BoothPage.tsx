import React, { useEffect, useState } from 'react'
import {
  Booth as BoothInterface,
  BoothPdfUrlsInner as BoothPdfUrlsInterface,
  BoothApi,
  Configuration,
} from '../../client-axios'
import * as Styled from './styled'
import * as CommonStyled from '../../styles/styled'
import { Grid } from '@material-ui/core'
import { Button } from '@material-ui/core'
import AttachmentPdfs from './internal/AttachmentPdfs'
import { AttachmentImages } from './internal/AttachmentImages/AttachmentImages'
import { Miro } from '../../components/Miro'
import AttachmentVimeos from './internal/AttachmentVimeos'

type Props = {
  boothId?: string
}

export class BoothPdf implements BoothPdfUrlsInterface {
  url?: string
  title?: string
}

export class Booth implements BoothInterface {
  id: number
  sponsorId: number
  sponsorName: string
  published: boolean
  description: string
  url?: string
  abbr: string
  text: string
  logoUrl: string
  vimeoUrls?: Array<string>
  miroUrl: string
  pdfUrls: Array<BoothPdf>
  keyImageUrls: Array<string>

  constructor(
    id: number,
    sponsorId: number,
    sponsorName: string,
    published: boolean,
    description: string,
    abbr: string,
    text: string,
    logoUrl: string,
    vimeoUrls: Array<string>,
    miroUrl: string,
    pdfUrls: Array<BoothPdf>,
    keyImageUrls: Array<string>,
    url?: string,
  ) {
    this.id = id
    this.sponsorId = sponsorId
    this.sponsorName = sponsorName
    this.published = published
    this.description = description
    this.url = url
    this.abbr = abbr
    this.text = text
    this.logoUrl = logoUrl
    this.vimeoUrls = vimeoUrls
    this.miroUrl = miroUrl
    this.pdfUrls = pdfUrls
    this.keyImageUrls = keyImageUrls
  }
}

export const BoothPage: React.FC<Props> = ({ boothId }) => {
  const [booth, setBooth] = useState<Booth>()
  const getBooth = async () => {
    if (!boothId) return
    const api = new BoothApi(
      new Configuration({ basePath: window.location.origin }),
    )
    const { data } = await api.apiV1BoothsBoothIdGet(boothId)
    setBooth(data)
  }
  const [timer, setTimer] = useState<number>()

  useEffect(() => {
    getBooth()
  }, [boothId])

  useEffect(() => {
    clearInterval(timer)
    setTimer(
      window.setInterval(() => {
        window.tracker.track('booth', {
          name: booth?.sponsorName,
          id: booth?.id,
        })
      }, 60 * 1000),
    )
  }, [booth])

  function createMarkup(text?: string) {
    if (!text) return
    return { __html: text }
  }

  return (
    <CommonStyled.OuterContainer
      container
      spacing={1}
      alignItems="center"
      justify="center"
    >
      <Grid item xs={12} md={11}>
        <CommonStyled.Container>
          <Grid item xs={12}>
            <CommonStyled.CenterizedContainer>
              <Styled.LogoImg src={booth?.logoUrl} />
            </CommonStyled.CenterizedContainer>
            <CommonStyled.Header2 centerized={true}>
              {booth?.sponsorName}
            </CommonStyled.Header2>
            <Styled.PreWrapP
              dangerouslySetInnerHTML={createMarkup(booth?.description)}
            ></Styled.PreWrapP>
          </Grid>

          <AttachmentImages images={booth?.keyImageUrls} />
          <Grid item xs={12}>
            <CommonStyled.CenterizedContainer>
              <Styled.PreWrapP
                dangerouslySetInnerHTML={createMarkup(booth?.text)}
              ></Styled.PreWrapP>
            </CommonStyled.CenterizedContainer>
          </Grid>

          {booth?.miroUrl && (
            <Grid item xs={12}>
              <CommonStyled.Header2 centerized={true}>
                オンラインホワイトボード
              </CommonStyled.Header2>
              <CommonStyled.CenterizedContainer>
                <CommonStyled.ButtonContainer>
                  <Button
                    href={`https://miro.com/app/board/${booth?.miroUrl}/`}
                    variant="contained"
                    color="secondary"
                  >
                    参加する
                  </Button>
                </CommonStyled.ButtonContainer>
              </CommonStyled.CenterizedContainer>
              <Miro
                miroId={booth?.miroUrl}
                liveEmbed={false}
                viewport="moveToViewport=-94,-1521,7088,5264"
              />
            </Grid>
          )}
          {booth?.vimeoUrls && <AttachmentVimeos urls={booth?.vimeoUrls} />}
          {booth?.pdfUrls && (
            <Grid item xs={12}>
              <CommonStyled.Header2 centerized={true}>
                PDF資料ダウンロード
              </CommonStyled.Header2>
              <AttachmentPdfs pdfs={booth?.pdfUrls} />
            </Grid>
          )}
        </CommonStyled.Container>
      </Grid>
      {/*<Grid item xs={12} md={11}>*/}
      {/*  <Booths event={event} openNewWindow={false} />*/}
      {/*</Grid>*/}
    </CommonStyled.OuterContainer>
  )
}
