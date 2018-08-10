import React, { Component } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { asyncComputed } from 'computed-async-mobx'

import { Field, Button, TextInput, Text } from '@aragon/ui'

import { mainStore, EditMode } from '../stores/main-store'

const Main = styled.div`
    
`

@observer
export class EditPermissions extends Component {

  state = { 
    newAddressWrite: '',
    newAddressRead: ''
  }

  constructor(props) {
    super(props)
  }

  readPermissions = () => mainStore.selectedFilePermissions.get()
                            .filter(permission => permission.read === true)

  writePermissions = () => mainStore.selectedFilePermissions.get()
                            .filter(permission => permission.write === true)

  addReadPermission = async () => {
    await mainStore.addReadPermission(this.props.file.id, this.state.newAddressRead)
    this.setState({ newAddressRead: '' })
  }

  removeReadPermission = async () => {
    await mainStore.removeReadPermission(this.props.file.id, this.state.newAddressRead)
    this.setState({ newAddressRead: '' })
  }

  addWritePermission = async () => {
    await mainStore.addWritePermission(this.props.file.id, this.state.newAddressWrite)
    this.setState({ newAddressWrite: '' })
  }

  removeWritePermission = async () => {
    await mainStore.removeWritePermission(this.props.file.id, this.state.newAddressWrite)
    this.setState({ newAddressWrite: '' })
  }

  selectAddressRead(entity) {
    this.setState({ newAddressRead: entity })
  }

  selectAddressWrite(entity) {
    this.setState({ newAddressWrite: entity })
  }

  render() {
    return (
      <Main>
        <Title>Write permissions</Title>
        <Field label="Entity address:">
          <TextInput value={this.state.newAddressWrite} onChange={e => this.setState({ newAddressWrite: e.target.value })} />
          <AddButton onClick={this.addWritePermission}>Add</AddButton>
          <RemoveButton onClick={this.removeWritePermission}>Remove</RemoveButton>
        </Field>
        <AddressList>
          {this.writePermissions()
            .map(permission => 
              <Address key={permission.entity} onClick={this.selectAddressWrite.bind(this, permission.entity)}>{permission.entity}</Address>
          )}
        </AddressList>

        <Title style={{marginTop: '60px'}}>Read permissions</Title>
        <Field label="Entity address:">
          <TextInput value={this.state.newAddressRead} onChange={e => this.setState({ newAddressRead: e.target.value })} />
          <AddButton onClick={this.addReadPermission}>Add</AddButton>
          <RemoveButton onClick={this.removeReadPermission}>Remove</RemoveButton>
        </Field>
        <AddressList>
          {this.readPermissions()
            .map(permission => 
              <Address key={permission.entity} onClick={this.selectAddressRead.bind(this, permission.entity)}>{permission.entity}</Address>
          )}
        </AddressList>

        <Actions>            
          <ActionButton mode="outline" onClick={() => mainStore.setEditMode(EditMode.None)} emphasis="positive">OK</ActionButton>
          <ActionButton mode="outline" onClick={() => mainStore.setEditMode(EditMode.None)} emphasis="negative">Cancel</ActionButton>
        </Actions>
      </Main>
    )
  }
}

const Title = styled(Text).attrs({ size: 'xlarge'})`
  display: block;
  margin: 8px 0;
`

const AddButton = styled(Button).attrs({ 
    compact: true, 
    mode: 'outline', 
    emphasis: 'positive' 
  })`
  display: inline-block;
  margin: 0px 4px;
`

const RemoveButton = styled(Button).attrs({ 
  compact: true, 
  mode: 'outline', 
  emphasis: 'negative' 
})`
display: inline-block;
margin: 0px;
`

const AddressList = styled.div`
  margin-top: 12px;
  overflow-y: scroll;
  max-height: 150px;
`

const Address = styled(Button)`
  margin-bottom: 2px;
  margin-left: 1px;
  width: 349px;
  font-size: small;
`

const Actions = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
`

const ActionButton = styled(Button)`
  display: inline-block;
  margin: 8px 10px;
`