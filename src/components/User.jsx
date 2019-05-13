import React, { useState, useEffect } from 'react'
import { Table, Tag, Input, Button, Row, Col, Tooltip } from 'antd'
import UserForm from './UserForm'

const Search = Input.Search

export default function User() {
  const [data, setData] = useState([
    {
      id: '1',
      email: 'mrjdavidfg@gmail.com',
      firstName: 'David',
      lastName: 'Ferreira',
      password: 'abc123',
      role: 'admin'
    },
    {
      id: '2',
      email: 'otro@gmail.com',
      firstName: 'Fulano',
      lastName: 'De Tal',
      password: 'abc123',
      role: 'barista'
    }
  ])

  const [visible, setVisible] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)

  let formRef
  let formRefs = []

  const showModal = () => {
    setVisible(true)
  }

  const handleCreate = e => {
    console.log('Creating...')
    console.log(formRef.getForm().getFieldsValue())
    // setTimeout(() => {
    //   this.setState({ loading: false, visible: false });
    // }, 3000);
    setVisible(false)
  }

  const handleCancel = e => {
    console.log('Cancelled.')
    setVisible(false)
  }

  const showModalEdit = () => {
    setVisibleEdit(true)
  }

  const handleCancelEdit = e => {
    console.log('Cancelled.')
    setVisibleEdit(false)
  }

  const handleSaveEdit = id => {
    console.log('Saving...')
    console.log(formRef.getForm().getFieldsValue())
    // setTimeout(() => {
    //   this.setState({ loading: false, visible: false });
    // }, 3000);
    setVisibleEdit(false)
  }

  const handleDeleteEdit = id => {
    console.log('Deleting...')

    setVisibleEdit(false)
  }

  const saveFormRef = (_formRef, index) => {
    formRef = _formRef
  }
  const saveFormRefEdition = (_formRef, index) => {
    return function(_formRef) {
      console.log(index)
      formRefs[index] = _formRef
    }
  }

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'First name',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'Last name',
      dataIndex: 'lastName',
      key: 'lastName'
    },
    {
      title: 'Role',
      key: 'role',
      dataIndex: 'role',
      render: role => {
        let color
        switch (role) {
          case 'admin':
            color = 'green'
            break
          case 'barista':
            color = 'blue'
            break
          default:
            color = 'gray'
        }

        return (
          <span>
            <Tag color={color} key={role}>
              {role.toUpperCase()}
            </Tag>
          </span>
        )
      }
    },
    {
      key: 'action',
      render: (text, record, index) => (
        <React.Fragment>
          <Tooltip title="Edit">
            <Button icon="form" style={{ width: 40 }} onClick={showModalEdit} />
          </Tooltip>
          <UserForm
            ref={saveFormRefEdition(index)}
            visible={visibleEdit}
            edition={true}
            onCancel={handleCancelEdit}
            onSave={handleSaveEdit}
            onDelete={handleDeleteEdit}
            user={record}
          />
        </React.Fragment>
      )
    }
  ]

  return (
    <React.Fragment>
      <Row style={{ paddingBottom: 25 }} gutter={6}>
        <Col span={18}>
          <Search placeholder="Search" onSearch={value => console.log(value)} />
        </Col>
        <Col span={6}>
          <Button
            type="primary"
            icon="plus"
            style={{ width: '100%' }}
            onClick={showModal}
          >
            New User
          </Button>
          <UserForm
            ref={saveFormRef}
            visible={visible}
            edition={false}
            onCancel={handleCancel}
            onCreate={handleCreate}
          />
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} rowKey={record => record.id} />
    </React.Fragment>
  )
}
