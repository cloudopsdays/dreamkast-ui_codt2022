import styled from 'styled-components'
import { List as OriginList, ListItem } from '@material-ui/core'

export const Container = styled.div`
  padding: 8px;
  height: 500px;
`

export const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  border: 1.5px solid black;
  border-bottom: none;
  border-radius: 10px 10px 0px 0px;
  background-color: #ffffff;
  color: #037f8c;
`

export const List = styled(OriginList)`
  height: 450px;
  border: 1.5px solid;
  overflow-y: scroll;
  border-radius: 0px 0px 10px 10px;
  background-color: #ffffff;
  padding-bottom: 10px !important;

  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 0 0 5px 0;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(3, 127, 140, 0.8);
  }
`

export const Item = styled(ListItem)`
  background-color: ${({ selected }) =>
    selected ? 'rgba(242, 182, 198, 0.5)' : 'inherit'} !important;
  &:hover {
    background-color: rgba(242, 182, 198, 0.2) !important;
  }
`

export const Text = styled.div`
  font-size: 0.9rem;
  line-height: 1.2rem;
  padding: 2px 0;
`
