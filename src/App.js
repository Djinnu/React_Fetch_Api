import React, { Component } from 'react'
import './App.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const ActionAreaCard = ({url, breed}) => {
  console.log(breed)
  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="500"
          image={url}
          alt="cat"
        />
        <CardContent>
          <Typography gutterBottom variant="body1" component="div">
            {breed.name}
          </Typography>
          <Typography variant="h6">
            {breed.origin}
          </Typography>
          <p>Temperament: <span className='text'>{breed.temperament}</span></p>
          <p>Life Span: <span className='text'>{breed.life_span + " years"}</span></p>
          {breed.weight ? <p>Weight: <span className='text'>{breed.weight.metric + " Kg"}</span></p> : ""}
          <p>Description</p>
          <p><span className='text'>{breed.description}</span></p>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const styles = {
  display: "inline-block",
  padding: "5px",
  border: "1px solid black",
  margin: "5px"
}

const Breed = ({country, count}) => <span style={styles}>{country.toUpperCase()}({count})</span>

class App extends Component {
  state = {
    url: "",
    data: [],
    breed: {}
  }

  componentDidMount() {
    this.fetchData()
  }
  
  fetchData = async() => {
    const url = "https://api.thecatapi.com/v1/breeds";
    let res = await fetch(url)
    let data = await res.json()
    let randomBreed = data[(Math.floor(Math.random() * this.state.data.length))]
    this.setState({data: data})
    this.setState({breed: randomBreed})
    const imgUrl = `https://api.thecatapi.com/v1/images/search?breed_id=${randomBreed.id}`
    let imgRes = await fetch(imgUrl)
    let imgData = await imgRes.json()
    this.setState({url: imgData[0].url})
  }

  render() {
    let catBreedsArr = this.state.data;
    let catBreedsObj = {};
    let countriesArr = [];
    catBreedsArr.forEach(x => catBreedsObj[x.origin] = catBreedsObj[x.origin] ? catBreedsObj[x.origin] += 1: 1)
    for(const breed in catBreedsObj) {
      countriesArr.push([breed, catBreedsObj[breed]])
    }

    let sortedArr = countriesArr.sort((a, b) => a[1] > b[1])
        
    return (
      <div className='App'>
        <div className='Countries'>
          {sortedArr.map(x => <Breed country={x[0]} count={x[1]} key={x[0]}/>)}
          <span style={styles}>ALL</span>
        </div>
        <ActionAreaCard url={this.state.url} breed={this.state.breed}/>
      </div>
    )
  }
}


export default App