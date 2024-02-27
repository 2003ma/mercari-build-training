import React, { useEffect, useState } from 'react';


interface Item {
  id: number;
  name: string;
  category: string;
  image: string;
};


const server = process.env.REACT_APP_API_URL || 'http://127.0.0.1:9000';

interface Prop {
  reload?: boolean;
  onLoadCompleted?: () => void;
}

export const ItemList: React.FC<Prop> = (props) => {
  const { reload = true, onLoadCompleted } = props;
  const [items, setItems] = useState<Item[]>([])
  const fetchItems = () => {
    fetch(server.concat('/items'),
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log('GET success:', data.items);
        setItems(data.items);
        onLoadCompleted && onLoadCompleted();
      })
      .catch(error => {
        console.error('GET error:', error)
      })
  }


  useEffect(() => {
    if (reload) {
      fetchItems();
    }
  }, [reload]);

  return (
    <div className="ItemBox">
      {items.map((item) => {
        const imagePath=server+"/image/"+item.image
        return (
          <div key={item.id} className='ItemList'>
            <img
              src={imagePath} // ハッシュ値をファイル名として使用して画像のURLを構築
              alt={item.name} // 画像の代替テキスト
          
            />
            <p>
              <span>Name: {item.name}</span>
              <br />
              <span>Category: {item.category}</span>
            </p>
          </div>
        )
      })}
    </div>
  )
};
