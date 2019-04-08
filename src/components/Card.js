import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin: 0.75rem 0;
  padding: 1.5rem;
  text-align: left;
  border: 1px solid lightgray;
`

const FullName = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  word-break: break-all;

  a {
    color: inherit;
  }
`

const InfoPanel = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-top: 1rem;
`

class Card extends Component {
  render() {
    const repo = this.props.repo

    return (
      <Container>
        <div>
          <FullName>
            <a href={repo.html_url} rel="noopener noreferrer" target="_blank">
              {repo.full_name}
            </a>
          </FullName>
          <p>{repo.description}</p>
          <InfoPanel>
            <div>Forks: {repo.forks}</div>
          </InfoPanel>
        </div>
      </Container>
    )
  }
}

export default Card
