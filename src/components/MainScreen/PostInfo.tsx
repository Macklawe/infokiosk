import * as React from 'react';
import classNames from 'classnames';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';
import { IStore, store } from '../../store';
import { inject, observer } from 'mobx-react';
import { serverUrl } from '..';

import SwipeableViews from 'react-swipeable-views';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: 'calc(100vh - 84px)',
      padding: '44px 56px',
      display: 'flex'
    },
    imageContainer: {
      height: '100%',
      width: '35vw',
      background: 'rgba(24,26,32, .2)',
      border: '1px solid rgba(240,209,168,.2)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      transition: '0.5s all ease'
    },
    imageContainerActive: {
      width: '100vw',
      height: '100vh',
      margin: '-120px -104px 0 -56px',
      background: 'rgba(24,26,32, 1)',
      border: 'none'
    },
    infoContainer: {
      height: '100%',
      width: 'calc(65vw - 160px)',
      marginLeft: 48,
      overflow: 'hidden',
      transition: '0.3s all ease'
    },
    infoContainerDisabled: {
      width: 0,
      paddingRight: 0
    },
    image: {
      width: '100%',
      height: '65vh',
      objectFit: 'contain',
      marginTop: 32,
      padding: '0 32px',
      transition: '0.6s all ease'
    },
    title: {
      color: '#fff',
      fontSize: 36,
      marginBottom: 16
    },
    subTitle: {
      color: 'rgba(255,255,255, .6)',
      fontSize: 20,
      lineHeight: '24px',
      marginBottom: 24
    },
    arrow: {
      border: '1px solid rgba(240,209,168,.2)',
      borderBottom: 'none',
      borderLeft: 'none',
      width: '152px',
      padding: 16,
      height: 70,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    arrowLeft: {
      width: 24,
      height: 24,
      border: '2px solid #F0D1A8',
      borderRight: 'none',
      borderBottom: 'none',
      transform: 'rotateZ(-45deg)',
      float: 'left'
    },
    arrowRight: {
      width: 24,
      height: 24,
      border: '2px solid #F0D1A8',
      borderLeft: 'none',
      borderBottom: 'none',
      transform: 'rotateZ(45deg)',
      float: 'right'
    },
    imageFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    dotContainer: {
      height: '100%',
      display: 'flex',
      alignItems: 'center'
    },
    dotWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      borderTop: '1px solid rgba(240,209,168,.2)'
    },
    dot: {
      width: 16,
      height: 2,
      background: '#636976',
      display: 'inline-block',
      margin: '0 4px'
    },
    dotActive: { background: '#f0d1a8' },
    iconWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '70px',
      padding: 16,
      borderTop: '1px solid rgba(240,209,168,.2)',
      borderLeft: '1px solid rgba(240,209,168,.2)'
    },
    iconLine: {
      width: 44
    },
    iconTopLeft: {
      float: 'left'
    },
    iconTopLeftActive: {
      transform: 'rotateZ(-180deg)'
    },
    iconTopRight: {
      float: 'right',
      transform: 'rotateZ(90deg)'
    },
    iconTopRightACtive: {
      transform: 'rotateZ(-90deg)'
    },
    iconBottomLeft: {
      float: 'left',
      transform: 'rotateZ(-90deg)'
    },
    iconBottomLeftActive: {
      transform: 'rotateZ(90deg)'
    },
    iconBottomRight: {
      float: 'right',
      transform: 'rotateZ(180deg)'
    },
    iconBottomRightActive: {
      transform: 'rotateZ(0deg)'
    },
    underline: {
      width: 80,
      height: 2,
      background: '#DCBE98',
      marginBottom: 40
    },
    text: {
      fontSize: 24,
      lineHeight: '30px',
      color: '#fff',
      overflowY: 'scroll',
      height: '100%',
      paddingRight: 16
    },
    textContainer: {
      overflow: 'hidden',
      position: 'relative'
    },
    soapTop: {
      position: 'absolute',
      top: 0,
      width: 'calc(100% - 31px)',
      height: 60,
      background: 'linear-gradient(to bottom,rgb(57, 61, 69), rgba(57, 61, 69, 0.2))',
      opacity: 0,
      transition: '0.15s all ease'
    },
    soapBottom: {
      position: 'absolute',
      bottom: 0,
      width: 'calc(100% - 31px)',
      height: 60,
      background: 'linear-gradient(to top,rgb(57, 61, 69), rgba(57, 61, 69, 0.2))',
      opacity: 0,
      transition: '0.15s all ease'
    },
    soapActive: {
      opacity: 1
    },
    imageDesc: {
      fontSize: 24,
      color: '#fff',
      lineHeight: '30px',
      marginTop: 24
    }
  });

interface Props extends WithStyles<typeof styles> {
  match: any;
  store: IStore;
}

interface State {
  slideIndex: number;
  isOpen: boolean;
  update: boolean;
}

class PostInfo extends React.Component<Props, State> {
  soap: any = null;
  text: any = null;
  constructor(props: any) {
    super(props);

    this.soap = React.createRef();
    this.text = React.createRef();

    this.state = {
      slideIndex: 0,
      update: true,
      isOpen: false
    };

    const postId = this.props.match.params.postid;
    fetch(`${serverUrl}/ip/records/${postId}`)
      .then(res => {
        return res.json();
      })
      .then(post => store.setPostInfo(post))
      .catch(error => {
        console.log(error);
        this.props.store.openNotification();
      });
  }

  next = () => {
    if (this.state.slideIndex !== store.postInfo.images.length - 1) {
      this.setState({
        slideIndex: this.state.slideIndex + 1
      });
    }
  };

  previous = () => {
    if (this.state.slideIndex !== 0) {
      this.setState({
        slideIndex: this.state.slideIndex - 1
      });
    }
  };

  selectSlide = (index: number) => {
    this.setState({
      slideIndex: index
    });
  };

  toggleImage = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  createMarkUp = () => {
    return { __html: store.postInfo.text };
  };

  componentDidUpdate() {
    function resize(title: any, text: any) {
      let height = title.current.offsetHeight;
      let container = text.current.parentElement;
      container.setAttribute('style', `height: calc(100% - ${height}px - 40px)`);
    }

    if (this.state.update) {
      resize(this.text, this.soap);
      this.setState({ update: false });
    }
    this.soap.current.addEventListener('scroll', () => this.handlerScroll(), true);
  }

  componentWillUnmount() {
    store.clearPostInfo();
    this.soap.current.removeEventListener('scroll', () => this.handlerScroll(), true);
  }

  handlerScroll = () => {
    const height = this.soap.current.offsetHeight;
    let scrollOffset = this.soap.current.scrollTop;
    const childHeight = this.soap.current.firstElementChild.offsetHeight;
    if (scrollOffset === 0) {
      this.soap.current.previousElementSibling.classList.remove(`${this.props.classes.soapActive}`);
    } else if (height + scrollOffset < childHeight) {
      this.soap.current.previousElementSibling.classList.add(`${this.props.classes.soapActive}`);
      this.soap.current.nextElementSibling.classList.add(`${this.props.classes.soapActive}`);
    } else if (height + scrollOffset >= childHeight) {
      this.soap.current.nextElementSibling.classList.remove(`${this.props.classes.soapActive}`);
    }
  };

  render() {
    const { classes, store } = this.props;
    const { isOpen } = this.state;

    let arrowLeft: any = <div className={classes.arrowLeft} onClick={this.previous} />;
    let arrowRight: any = <div className={classes.arrowRight} onClick={this.next} />;

    return (
      <div className={classes.root}>
        {Object.keys(store.postInfo).length !== 0 ? (
          <>
            <div className={classNames(classes.imageContainer, isOpen ? classes.imageContainerActive : null)}>
              <SwipeableViews
                enableMouseEvents
                index={this.state.slideIndex}
                onChangeIndex={(index: number) => this.setState({ slideIndex: index })}
              >
                {store.postInfo && store.postInfo.images.length !== 0
                  ? store.postInfo.images.map((image: any, index: any) => {
                      return (
                        <React.Fragment key={index}>
                          <img className={classes.image} src={serverUrl + '/records/image/' + image.name} alt="" />
                          {isOpen ? (
                            image.description && image.description.length !== 0 ? (
                              <Typography className={classes.imageDesc} variant="subtitle2" align="center">
                                {image.description}
                              </Typography>
                            ) : null
                          ) : null}
                        </React.Fragment>
                      );
                    })
                  : null}
              </SwipeableViews>

              <div className={classes.imageFooter}>
                <div className={classes.arrow}>
                  {arrowLeft}
                  {arrowRight}
                </div>
                <div className={classes.dotWrapper}>
                  {store.postInfo.images.map((item: any, index: any) => {
                    return (
                      <div key={index} className={classes.dotContainer} onClick={() => this.selectSlide(index)}>
                        <div
                          className={classNames(
                            classes.dot,
                            index === this.state.slideIndex ? classes.dotActive : null
                          )}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className={classes.iconWrapper} onClick={this.toggleImage}>
                  <div className={classes.iconLine}>
                    <img
                      className={classNames(classes.iconTopLeft, isOpen ? classes.iconTopLeftActive : null)}
                      src={require('../../images/Vector.svg')}
                      alt=""
                    />
                    <img
                      className={classNames(classes.iconTopRight, isOpen ? classes.iconTopRightACtive : null)}
                      src={require('../../images/Vector.svg')}
                      alt=""
                    />
                  </div>
                  <div className={classes.iconLine}>
                    <img
                      className={classNames(classes.iconBottomLeft, isOpen ? classes.iconBottomLeftActive : null)}
                      src={require('../../images/Vector.svg')}
                      alt=""
                    />
                    <img
                      className={classNames(classes.iconBottomRight, isOpen ? classes.iconBottomRightActive : null)}
                      src={require('../../images/Vector.svg')}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={classNames(classes.infoContainer, isOpen ? classes.infoContainerDisabled : null)}>
              <div ref={this.text}>
                <Typography className={classes.title} variant="h2">
                  {store.postInfo.title}
                </Typography>
                <Typography className={classes.subTitle} variant="subtitle1">
                  {store.postInfo.subtitle}
                </Typography>
                <div className={classes.underline} />
              </div>

              <div className={classes.textContainer}>
                <div className={classes.soapTop} />
                <div className={classes.text} dangerouslySetInnerHTML={this.createMarkUp()} ref={this.soap} />
                <div className={classNames(classes.soapBottom, classes.soapActive)} />
              </div>
            </div>
          </>
        ) : null}
      </div>
    );
  }
}

export default inject('store')(withStyles(styles)(observer(PostInfo)));
