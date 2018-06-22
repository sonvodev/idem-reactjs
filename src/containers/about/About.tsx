import * as React from 'react'
import { IProps, IState } from './About.PropsState'
import './About.css'

class AboutContainer extends React.Component<IProps, IState>{
  /**
   *
   */
  constructor(props: Readonly<IProps>) {
    super(props);

  }
  render() {
    return (
      <div>
        <h1>Võ Hồng Sơn</h1>
      </div>
    )
  }
}

export default AboutContainer