import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import {Navbar} from '../../components/navbar.js'
import styles from '../../styles/content.module.css'
import Head from 'next/head'

export const Post = ({ title, body, image }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const imgBuilder = imageUrlBuilder({
      projectId: 'tsjygz8q',
      dataset: 'production',
    });

    setImageUrl(imgBuilder.image(image));
  }, [image]);

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar/>
        <h1>{title}</h1>
        <div className={styles.content}>
        <div className={styles.image}>
        {imageUrl && <img src={imageUrl} />}
        </div>
        <div className={styles.text}>
          <BlockContent blocks={body} />
        </div>
        </div>
      </div>
    
  );
};

export const getServerSideProps = async pageContext => {
  const pageSlug = pageContext.query.slug;
  
  if (!pageSlug) {
    return {
      notFound: true
    }
  }

  const query = encodeURIComponent(`*[ _type == "post" && slug.current == "${pageSlug}" ]`);
  const url = `https://tsjygz8q.api.sanity.io/v1/data/query/production?query=${query}`;

  const result = await fetch(url).then(res => res.json());
  const post = result.result[0];

  if (!post) {
    return {
      notFound: true
    }
  } else {
    return {
      props: {
        body: post.body,
        title: post.title,
        image: post.mainImage,
      }
    }
  }
};

export default Post;