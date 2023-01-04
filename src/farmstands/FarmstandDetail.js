import { 
  Card, 
  CardImg, 
  CardText, 
  CardBody, 
  Col, 
  CardTitle, 
  CardSubtitle, 
  ListGroup,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';
import { useState } from 'react';
import '../css/FarmstandDetail.css'

const FarmstandDetail = ({farmstand}) => {
  const {images, farmstandName, description, products, _id} = farmstand;

  const imageLink = `http://localhost:8080/images/${_id}/`

  /* Carousel */  

  const items = 
    images.map((image, idx) => ({
      src: imageLink + `${image}`,
      key: idx + 1
    }))
    // {
    //   src: 'https://picsum.photos/id/123/1200/400',
    //   altText: 'Slide 1',
    //   caption: 'Slide 1',
    //   key: 1,
    // },
    // {
    //   src: 'https://picsum.photos/id/456/1200/400',
    //   altText: 'Slide 2',
    //   caption: 'Slide 2',
    //   key: 2,
    // },
    // {
    //   src: 'https://picsum.photos/id/678/1200/400',
    //   altText: 'Slide 3',
    //   caption: 'Slide 3',
    //   key: 3,
    // },
  

  console.log('images: ', images)
  console.log('items: ', items)
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
  
    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    };
  
    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    };
  
    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    };
  
    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} style={{width:'100%'}} />
          <CarouselCaption
            captionText={item.caption}
            captionHeader={item.caption}
          />
        </CarouselItem>
      );
    });
    /* end carousel */

  return (
    <Col md='5' className='m-1'>
      <Card>
        <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      interval={false}
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
        {/* <CardImg top src={imageLink + `${images[0]}`} alt={farmstandName} /> */}
        <CardTitle className='m-2 ms-3' tag="h4" >{farmstandName}</CardTitle>
        <ListGroup>
        <CardSubtitle className='ms-3 my-2'>{description}</CardSubtitle>
        </ListGroup>
        <ListGroup>
        <CardBody className='ms-3 my-2'>
        
          <CardText>
            
            <span className='products-list' style={{'fontWeight':'700'}}>Products:
            <span style={{'fontWeight':'400'}}>
            {/* <ul>
              {products.map(p => <li>{p}</li>) key=}
            </ul> */}
            <ul className='products' >
            {products.map((product, idx) => {
              return(
                product && (
                  
                    <li key={idx}>{product}</li>
                  
                )
              )
            })}
            </ul>
            </span>
            </span>
            
          </CardText>

        </CardBody>
        </ListGroup>
      </Card>
    </Col>
  );
};

export default FarmstandDetail;