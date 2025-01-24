import SearchWithTags from './Search';

const Home = () => {
  return (
    <div className='container mx-auto p-4'>
      <div className="text-2xl mb-4">SpeakX</div>
      <SearchWithTags />
    </div>
  )
}

export default Home;