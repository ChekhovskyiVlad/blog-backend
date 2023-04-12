import PostModel from '../models/Post.js';

export const create = async (req, res) => {
    try {
      const doc = new PostModel({
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags.split(','),
        user: req.userId,
      });

      const post = await doc.save();

      res.json(post);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Не удалось создать статью',
      });
    }
  };

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();
    const tags = posts.map((obj) => obj.tags).flat().slice(0, 5)
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
}

export const getOne = async (req, res) => {
    PostModel
    .findByIdAndUpdate(req.params.id)
    .then((plane)=> {
        res.status(200)
        .json(plane)
    })
    .catch(()=> res.status(500).json({error: 'Not access to return an article'}))
}



export const remove = async (req, res) => {
    try {
        const postId = req.params.postId
        PostModel.findOneAndDelete({
            _id: postId

        },{
            $inc: {viewsCount: 1},
        },{
            returnDocument: 'after',
        }, (err, doc) => {
            if(err) {
                console.log(err)
                return res.status(500).json({
                    message:'Failed remove an article',
                });
            }
            if(!doc) {
                return res.status(404).json({
                    message: 'Not found'
                });
            }
            res.json({
                success: true
            })
        })
    } catch (error) {
        console.log(err);
        res.status(500).json({
          message: 'Не удалось получить статьи',
        });
    }
}

export const update = async (req, res) => {
    try {
      const postId = req.params.id;

      await PostModel.updateOne(
        {
          _id: postId,
        },
        {
          title: req.body.title,
          text: req.body.text,
          imageUrl: req.body.imageUrl,
          user: req.userId,
          tags: req.body.tags.split(','),
        },
      );

      res.json({
        success: true,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Не удалось обновить статью',
      });
    }
  };