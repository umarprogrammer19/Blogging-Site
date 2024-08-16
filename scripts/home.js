import { signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';
import { auth, db } from './firebase.js';

const blogsContainer = document.getElementById('blogsContainer');

export function renderBlogs(blogs) {
    blogsContainer.innerHTML = '';
    blogs.forEach(blog => {
        const blogDiv = document.createElement('div');
        blogDiv.className = 'bg-gray-50 p-4 rounded-lg shadow-md mb-5';
        blogDiv.innerHTML = `
      <h3 class="text-lg font-semibold">${blog.title}</h3>
      <p class="mt-2">${blog.body}</p>
      <small class="block mt-2 text-gray-500">${blog.date.toDate().toLocaleString()}</small>
      <div class="mt-4 flex space-x-2">
        <button onclick="deleteBlog('${blog.id}')" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
      </div>
    `;
        blogsContainer.appendChild(blogDiv);
    });
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        const q = query(collection(db, 'blogs'), orderBy('date', 'desc'));
        onSnapshot(q, (querySnapshot) => {
            const blogs = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            renderBlogs(blogs);
        });
    } else {
        window.open("signin.html", "_self");
    }
});

document.getElementById('newBlogForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    try {
        await addDoc(collection(db, 'blogs'), {
            title,
            body,
            date: new Date(),
            userId: auth.currentUser.uid
        });
        document.getElementById('newBlogForm').reset();
    } catch (error) {
        console.error(error);
    }
});

document.deleteBlog = async (id) => {
    try {
        await deleteDoc(doc(db, 'blogs', id));
    } catch (error) {
        console.error(error);
    }
};

// For Signing Out User
const signOutUser = document.querySelector("#sign-out");
signOutUser.addEventListener("click", (event) => {
    event.preventDefault();
    signOut(auth).then(() => {
        window.open("signin.html", "_self");
    }).catch((error) => {
        alert(error);
    });
})
