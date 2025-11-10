import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const helloWorldApi = async () => {
    try {
      const response = await axios.get(`${API}/`);
      console.log(response.data.message);
    } catch (e) {
      console.error(e, `errored out requesting / api`);
    }
  };

  useEffect(() => {
    helloWorldApi();
  }, []);

  return (
    <div>
      <header className="App-header">
        <a
          className="App-link"
          href="https://emergent.sh"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="https://avatars.githubusercontent.com/in/1201222?s=120&u=2686cf91179bbafbc7a71bfbc43004cf9ae1acea&v=4" />
        </a>
        <p className="mt-5">Building something incredible ~!</p>
      </header>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


import React, { useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, ThumbsUp, ThumbsDown, MessageSquare, X } from 'lucide-react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const [audioElement, setAudioElement] = useState(null);

  // Configuração das partículas
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ['#ff0000', '#cc0000', '#880000']
      },
      shape: {
        type: ['circle', 'square'],
      },
      opacity: {
        value: 0.3,
        random: true,
        anim: {
          enable: true,
          speed: 0.5,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 4,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.5,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#ff0000',
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'repulse'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  };

  // Dados iniciais dos posts
  const initialPosts = [
    {
      id: '1',
      title: 'Mecha Sonic MK.1',
      description: 'Mecha Sonic Mk.I é uma versão robótica do Sonic com um exoesqueleto volumoso cinza-prateado, pés laranja brilhantes e um único olho luminoso. Ele possui várias lâminas giratórias na parte de trás da cabeça, no lugar dos espinhos do Sonic. Na parte de trás de seus sapatos, há rodas que o ajudam a acelerar. Os espinhos ativos do Mecha Sonic o protegiam de ataques pelas costas. Esses espinhos também eram úteis quando o robô executava sua própria variação do Ataque Giratório característico do Sonic. Assim como o ouriço, o Mecha Sonic também podia disparar a partir da imobilidade em sua forma de bola curvada, semelhante ao Spin Dash',
      imageUrl: 'https://i.imgur.com/Dxdpksg.png',
      likes: 0,
      dislikes: 0,
      comments: [],
      timestamp: Date.now(),
      likedBy: [],
      dislikedBy: []
    },
    {
      id: '2',
      title: 'Sonic MK.2',
      description: 'Mecha Sonic Mk. 2 é uma réplica robótica alta e robusta de Sonic O Ouriço, construída pelo Dr. Eggman.\n\nHabilidades:\nAssim como Sonic, possui velocidade sobre-humana e habilidades acrobáticas.\nVariantes do Ataque Giratório: Seu principal movimento ofensivo é o Ataque Giratório, com múltiplas variações, incluindo uma investida poderosa no chão e um salto aéreo\nDurabilidade e resistência: É uma unidade de combate altamente resistente, com significativa força mecânica, capaz de sobreviver a grandes batalhas e quedas.',
      imageUrl: 'https://i.imgur.com/FY1HPwK.png',
      likes: 0,
      dislikes: 0,
      comments: [],
      timestamp: Date.now() - 100000,
      likedBy: [],
      dislikedBy: []
    },
    {
      id: '3',
      title: 'mr careca',
      description: 'A careca brilha tanto dificultando você olhar para o rocha',
      imageUrl: 'https://i.imgur.com/eJWWZ99.png',
      likes: 999,
      dislikes: 0,
      comments: [],
      timestamp: Date.now() - 200000,
      likedBy: [],
      dislikedBy: []
    },
    {
      id: '4',
      title: 'Sonic Metal Calvice',
      description: 'Habilidade: luz ultra violeta que sai da testa',
      imageUrl: 'https://i.imgur.com/NNJam9V.png',
      likes: 0,
      dislikes: 0,
      comments: [],
      timestamp: Date.now() - 300000,
      likedBy: [],
      dislikedBy: []
    }
  ];

  // Funções auxiliares
  const getUserId = () => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('userId', userId);
    }
    return userId;
  };

  const savePosts = (postsData) => {
    localStorage.setItem('socialPosts', JSON.stringify(postsData));
  };

  const sendDiscordWebhook = async (type, data) => {
    const webhookUrl = 'https://discord.com/api/webhooks/1434643466322972763/nEGF1MSqcpmvFFa1KGlQzL8vRLDRMD8bf3qvc2NenlTFzuB8gUIhZgO_WrxGVCm5_RNw';
    
    let embed = {};
    
    if (type === 'like') {
      embed = {
        title: '👍 Novo Like!',
        description: `Alguém curtiu o post: **${data.postTitle}**`,
        color: 3447003,
        fields: [
          { name: 'Total de Likes', value: `${data.totalLikes}`, inline: true },
          { name: 'Post', value: data.postTitle, inline: false }
        ],
        timestamp: new Date().toISOString()
      };
    } else if (type === 'dislike') {
      embed = {
        title: '👎 Novo Dislike',
        description: `Alguém não curtiu o post: **${data.postTitle}**`,
        color: 15158332,
        fields: [
          { name: 'Total de Dislikes', value: `${data.totalDislikes}`, inline: true },
          { name: 'Post', value: data.postTitle, inline: false }
        ],
        timestamp: new Date().toISOString()
      };
    } else if (type === 'comment') {
      embed = {
        title: '💬 Novo Comentário!',
        description: `Um novo comentário foi adicionado em: **${data.postTitle}**`,
        color: 10181046,
        fields: [
          { name: 'Comentário', value: data.commentText, inline: false },
          { name: 'Total de Comentários', value: `${data.totalComments}`, inline: true }
        ],
        timestamp: new Date().toISOString()
      };
    }

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [embed] })
      });
    } catch (error) {
      console.error('Erro ao enviar webhook:', error);
    }
  };

  // Carregar posts
  useEffect(() => {
    const stored = localStorage.getItem('socialPosts');
    if (stored) {
      const storedPosts = JSON.parse(stored);
      const updatedPosts = initialPosts.map(post => {
        const savedPost = storedPosts.find(p => p.id === post.id);
        if (savedPost) {
          return {
            ...post,
            likes: savedPost.likes || post.likes,
            dislikes: savedPost.dislikes || post.dislikes,
            comments: savedPost.comments || [],
            likedBy: savedPost.likedBy || [],
            dislikedBy: savedPost.dislikedBy || []
          };
        }
        return post;
      });
      setPosts(updatedPosts);
    } else {
      setPosts(initialPosts);
    }
  }, []);

  // Handlers
  const handleLike = async (postId) => {
    const userId = getUserId();
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const hasLiked = post.likedBy?.includes(userId);
        const hasDisliked = post.dislikedBy?.includes(userId);
        
        let newPost = { ...post };
        
        if (hasLiked) {
          newPost.likes -= 1;
          newPost.likedBy = post.likedBy.filter(id => id !== userId);
        } else {
          newPost.likes += 1;
          newPost.likedBy = [...(post.likedBy || []), userId];
          
          sendDiscordWebhook('like', {
            postTitle: post.title,
            totalLikes: newPost.likes
          });
          
          if (hasDisliked) {
            newPost.dislikes -= 1;
            newPost.dislikedBy = post.dislikedBy.filter(id => id !== userId);
          }
        }
        
        return newPost;
      }
      return post;
    });
    
    setPosts(updatedPosts);
    savePosts(updatedPosts);
    
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(updatedPosts.find(p => p.id === postId));
    }
  };

  const handleDislike = async (postId) => {
    const userId = getUserId();
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const hasLiked = post.likedBy?.includes(userId);
        const hasDisliked = post.dislikedBy?.includes(userId);
        
        let newPost = { ...post };
        
        if (hasDisliked) {
          newPost.dislikes -= 1;
          newPost.dislikedBy = post.dislikedBy.filter(id => id !== userId);
        } else {
          newPost.dislikes += 1;
          newPost.dislikedBy = [...(post.dislikedBy || []), userId];
          
          sendDiscordWebhook('dislike', {
            postTitle: post.title,
            totalDislikes: newPost.dislikes
          });
          
          if (hasLiked) {
            newPost.likes -= 1;
            newPost.likedBy = post.likedBy.filter(id => id !== userId);
          }
        }
        
        return newPost;
      }
      return post;
    });
    
    setPosts(updatedPosts);
    savePosts(updatedPosts);
    
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(updatedPosts.find(p => p.id === postId));
    }
  };

  const handleComment = async (postId) => {
    if (!commentText.trim()) return;
    
    const comment = {
      id: Date.now().toString(),
      text: commentText,
      timestamp: Date.now()
    };
    
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const newPost = {
          ...post,
          comments: [...(post.comments || []), comment]
        };
        
        sendDiscordWebhook('comment', {
          postTitle: post.title,
          commentText: commentText,
          totalComments: newPost.comments.length
        });
        
        return newPost;
      }
      return post;
    });
    
    setPosts(updatedPosts);
    savePosts(updatedPosts);
    setCommentText('');
    
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(updatedPosts.find(p => p.id === postId));
    }
  };

  const toggleMute = () => {
    if (audioElement) {
      if (isMuted) {
        audioElement.play();
        audioElement.volume = 0.3;
      } else {
        audioElement.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  // Inicializar áudio
  useEffect(() => {
    const audio = new Audio('https://www.bensound.com/bensound-music/bensound-epic.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    setAudioElement(audio);
    
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  const userId = getUserId();

  return (
    <div className="app">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="particles-bg"
      />

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <img 
            src="https://i.imgur.com/UpjFZFE.png" 
            alt="EGGMAN Banner" 
            className="hero-banner"
          />
          <h1 className="hero-title glitch" data-text="EGGMAN">EGGMAN</h1>
          <p className="hero-subtitle">Máquinas são o futuro da humanidade</p>
        </div>
      </div>

      {/* Projects Section */}
      <div className="container">
        <h2 className="section-title">PROJETOS</h2>
        <div className="posts-grid">
          {posts.map(post => {
            const hasLiked = post.likedBy?.includes(userId);
            const hasDisliked = post.dislikedBy?.includes(userId);
            
            return (
              <div 
                key={post.id}
                className="post-card"
                onClick={() => setSelectedPost(post)}
              >
                {post.imageUrl && (
                  <div className="post-image-wrapper">
                    <img src={post.imageUrl} alt={post.title} className="post-image" />
                    <div className="post-overlay"></div>
                  </div>
                )}
                <div className="post-content">
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-description">{post.description}</p>
                  <div className="post-stats">
                    <span className={`stat ${hasLiked ? 'active-like' : ''}`}>
                      <ThumbsUp size={16} /> {post.likes}
                    </span>
                    <span className={`stat ${hasDisliked ? 'active-dislike' : ''}`}>
                      <ThumbsDown size={16} /> {post.dislikes}
                    </span>
                    <span className="stat">
                      <MessageSquare size={16} /> {post.comments?.length || 0}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedPost && (
        <div className="modal" onClick={(e) => {
          if (e.target.className === 'modal') setSelectedPost(null);
        }}>
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-header-left">
                {selectedPost.imageUrl && (
                  <img 
                    src={selectedPost.imageUrl} 
                    alt={selectedPost.title}
                    className="modal-thumb"
                  />
                )}
                <div>
                  <h2 className="modal-title">{selectedPost.title}</h2>
                  <p className="modal-date">
                    {new Date(selectedPost.timestamp).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
              <button className="close-btn" onClick={() => setSelectedPost(null)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-body">
              <p className="modal-description">{selectedPost.description}</p>
              
              <div className="action-buttons">
                <button 
                  className={`action-btn like-btn ${selectedPost.likedBy?.includes(userId) ? 'active' : ''}`}
                  onClick={() => handleLike(selectedPost.id)}
                >
                  <ThumbsUp size={20} /> {selectedPost.likes}
                </button>
                <button 
                  className={`action-btn dislike-btn ${selectedPost.dislikedBy?.includes(userId) ? 'active' : ''}`}
                  onClick={() => handleDislike(selectedPost.id)}
                >
                  <ThumbsDown size={20} /> {selectedPost.dislikes}
                </button>
              </div>

              <div className="comments-section">
                <h3 className="comments-title">
                  <MessageSquare size={24} />
                  Comentários ({selectedPost.comments?.length || 0})
                </h3>
                
                <div className="comment-form">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Escreva um comentário anônimo..."
                    rows={4}
                  />
                  <button 
                    className="btn-comment"
                    onClick={() => handleComment(selectedPost.id)}
                  >
                    Comentar
                  </button>
                </div>

                <div className="comments-list">
                  {selectedPost.comments?.length > 0 ? (
                    selectedPost.comments.map(comment => (
                      <div key={comment.id} className="comment">
                        <p className="comment-text">{comment.text}</p>
                        <p className="comment-date">
                          {new Date(comment.timestamp).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="empty-state">
                      <p>Nenhum comentário ainda. Seja o primeiro!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Music Player */}
      <div className="music-player">
        <button className="music-btn" onClick={toggleMute}>
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
        <span className="music-label">
          {isMuted ? 'Música Pausada' : 'Tocando'}
        </span>
      </div>
    </div>
  );
}

export default App;
