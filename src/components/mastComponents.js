
import React, { Component } from 'react';
import {
    Jumbotron,
    Container,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    Button,
} from 'reactstrap';



export function BrandJumbo(props) {
    console.log(props);

    return (
        < div class="brand-wrap" >
            <Container fluid="xl" className="p-0">
                <Jumbotron fluid className="branding p-0 m-0 position-relative">
                    <MastheadSlide {...props} />
                </Jumbotron>
            </Container >
        </div >
    );
}



export class MastheadSlide extends Component {
    render() {
        let { imageSet, title, text, button, fadeType } = this.props;
        let picture = null;
        let addClass = '';
        const breakPoints = [576, 768, 992, 1200];
        let defaultImg;
        let bpPointer = 0;
        let images = imageSet.map((image) => {
            if (image.bp >= bpPointer) {
                defaultImg = image;
                bpPointer = image.bp;
            }
            return (<source media={"(max-width:" + breakPoints[image.bp] + "px)"} srcset={image.src} />);
        });

        if (imageSet.length) {
            images.push((<img src={defaultImg.src} className="d-block w-100" />));
            picture = (
                <picture className="d-block w-100">
                    {images}
                </picture>
            );
            addClass += ' card-img-overlay';
        }
        addClass += fadeType ? ' ' + fadeType : '';
        let buttonComponent = button ? <Button tag="a" href={button.url} clildren={button.txt} {...button.attrs} /> : null;

        return (
            <React.Fragment>
                {picture}
                <div className={"row no-gutters align-items-center " + addClass}>
                    <div className="col-sm-8 col-md-6 ml-4 text-sm-left text-center">
                        <h2 className="display-4 text-center text-sm-left txt-over-bg pt-4 pt-sm-0">{title}</h2>
                        <p className="lead d-none d-md-block txt-over-bg ">{text} and some text</p>
                        {buttonComponent}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export class BrandCarousel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            animating: false,
        }
    }

    setActiveIndex(index) {
        this.setState({ activeIndex: index });
    }
    setAnimating(isAnimating) {
        this.setState({ animating: isAnimating });
    }
    next = () => {
        if (this.state.animating) return;
        const nextIndex = this.state.activeIndex === this.props.items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setActiveIndex(nextIndex);
    }

    previous = () => {
        if (this.state.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.props.items.length - 1 : this.state.activeIndex - 1;
        this.setActiveIndex(nextIndex);
    }
    goToIndex = (newIndex) => {
        if (this.state.animating) return;
        this.setActiveIndex(newIndex);
    }
    render() {
        const slides = this.props.items.map((item) => {
            return (
                <CarouselItem onExiting={() => this.setAnimating(true)} onExited={() => this.setAnimating(false)} key={item.id} >
                    <MastheadSlide  {...item} />
                </CarouselItem>
            );
        });


        return (
            <div class="brand-wrap">
                <Container fluid="xl" className="p-0">
                    <Carousel activeIndex={this.state.activeIndex} next={this.next} previous={this.previous} >
                        <CarouselIndicators items={this.props.items} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
                        {slides}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                    </Carousel>
                </Container>
            </div>
        );
    }
}