import * as React from 'react';
import classNames from 'classnames';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import SwipeableViews from 'react-swipeable-views';

import { serverUrl } from '..';
import { IStore, store } from '../../store';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: 'calc(100vh - 96px)',
      padding: '44px 56px',
      display: 'flex'
    },
    imageContainer: {
      height: 'calc(100vh - 184px)',
      width: '35vw',
      background: 'rgba(24,26,32, .2)',
      border: '1px solid rgba(240,209,168,.2)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      transition: '0.5s all ease',
      position: 'absolute',
      zIndex: 2,
      left: '56px'
    },
    imageContainerActive: {
      width: '100vw',
      height: '100vh',
      margin: '-140px -104px 0 -56px',
      background: 'rgba(24,26,32, 1)',
      border: 'none'
    },
    infoContainer: {
      height: 'calc(100vh - 184px)',
      width: 'calc(65vw - 160px)',
      marginLeft: 48,
      overflow: 'hidden',
      transition: '0.3s all ease',
      position: 'absolute',
      right: '56px',
      zIndex: 1
    },
    image: {
      width: '100%',
      height: '65vh',
      objectFit: 'contain',
      marginTop: 32,
      padding: '0 32px',
      transition: '0.6s all ease',
      touchAction: 'pan-x pan-y'
    },
    title: {
      color: '#fff',
      fontSize: 36,
      marginBottom: 16,
      lineHeight: '1'
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
      minWidth: '152px',
      padding: '0 32px',
      height: 70,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '@media screen and (max-width: 1600px)': {
        minWidth: 120
      }
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
      margin: '0 4px',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      maxWidth: 16
    },
    dotWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '70px',
      borderTop: '1px solid rgba(240,209,168,.2)',
      overflow: 'hidden'
    },
    dot: {
      width: '100%',
      height: 2,
      background: '#636976',
      display: 'inline-block'
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
      height: '100%',
      overflowY: 'scroll',
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
      marginTop: 24,
      padding: '0 24px'
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
    this.getPostInfo(postId);
  }

  interval: NodeJS.Timer | null | undefined = null;

  componentDidMount() {
    const postId = this.props.match.params.postid;
    this.interval = setInterval(() => this.getPostInfo(postId), 10000);
  }

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
    this.soap.current ? this.soap.current.addEventListener('scroll', () => this.handlerScroll(), true) : null;
  }

  componentWillUnmount() {
    store.clearPostInfo();
    this.soap.current ? this.soap.current.removeEventListener('scroll', () => this.handlerScroll(), true) : null;
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  getPostInfo = (postId: number) => {
    fetch(`${serverUrl}ip/records/${postId}`)
      .then(res => {
        return res.json();
      })
      .then(post => store.setPostInfo(post))
      .catch(error => {
        console.log(error);
        this.props.store.openNotification();
      });
  };

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
    const { isOpen, slideIndex } = this.state;

    let arrowLeft: any = (
      <div
        style={slideIndex === 0 ? { borderColor: '#505560' } : {}}
        className={classes.arrowLeft}
        onClick={this.previous}
      />
    );
    let arrowRight: any = (
      <div
        style={
          slideIndex === (store.postInfo.images && store.postInfo.images.length - 1) ? { borderColor: '#505560' } : {}
        }
        className={classes.arrowRight}
        onClick={this.next}
      />
    );

    return (
      <div className={classes.root}>
        {Object.keys(store.postInfo).length !== 0 ? (
          <>
            <div className={classNames(classes.imageContainer, isOpen ? classes.imageContainerActive : null)}>
              <SwipeableViews
                enableMouseEvents
                index={this.state.slideIndex}
                onChangeIndex={(index: number) => this.setState({ slideIndex: index })}
                style={{ overflowY: 'hidden' }}
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
                  {store.postInfo.images.map((item: any, index: any, images: any) => {
                    return (
                      <div
                        key={index}
                        style={{ width: `calc(100% / ${images.length})` }}
                        className={classes.dotContainer}
                        onClick={() => this.selectSlide(index)}
                      >
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
            <div className={classes.infoContainer}>
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
