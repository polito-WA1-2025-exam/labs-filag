
import { CarouselPoke, MyCard, MyForm, Title } from './Components.jsx'

function FirstPage(props) {
    return(
        <>
            <CarouselPoke text={props.textCarousel}></CarouselPoke>
            <Title text={props.text}></Title>
            <div className='card-container'>
                <MyCard text={props.textCard}></MyCard>
            </div>
            <MyForm text={props.text}></MyForm>
        </>
    )

}

export default FirstPage;