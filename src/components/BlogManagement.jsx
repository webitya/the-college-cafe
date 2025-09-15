"use client"

import { useState, useEffect } from "react"
import ArticleIcon from "@mui/icons-material/Article"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import ImageIcon from "@mui/icons-material/Image"
import FormatBoldIcon from "@mui/icons-material/FormatBold"
import FormatItalicIcon from "@mui/icons-material/FormatItalic"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import LinkIcon from "@mui/icons-material/Link"
import { convertGoogleDriveUrl, isValidGoogleDriveUrl } from "../lib/google-drive-utils"

export default function BlogManagement() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingBlog, setEditingBlog] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    featuredImage: "",
    published: false,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  })

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/admin/blogs")
      const data = await response.json()
      setBlogs(data.blogs || [])
    } catch (error) {
      console.error("Failed to fetch blogs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = editingBlog ? `/api/admin/blogs/${editingBlog._id}` : "/api/admin/blogs"

      const method = editingBlog ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        }),
      })

      if (response.ok) {
        await fetchBlogs()
        resetForm()
        alert(editingBlog ? "Blog updated successfully!" : "Blog created successfully!")
      } else {
        const error = await response.json()
        alert(error.error || "Failed to save blog")
      }
    } catch (error) {
      console.error("Error saving blog:", error)
      alert("Failed to save blog")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (blog) => {
    setEditingBlog(blog)
    setFormData({
      title: blog.title || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      category: blog.category || "",
      tags: blog.tags ? blog.tags.join(", ") : "",
      featuredImage: blog.featuredImage || "",
      published: blog.published || false,
      metaTitle: blog.metaTitle || "",
      metaDescription: blog.metaDescription || "",
      metaKeywords: blog.metaKeywords || "",
    })
    setShowForm(true)
  }

  const handleDelete = async (blogId) => {
    if (!confirm("Are you sure you want to delete this blog?")) return

    try {
      const response = await fetch(`/api/admin/blogs/${blogId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchBlogs()
        alert("Blog deleted successfully!")
      } else {
        alert("Failed to delete blog")
      }
    } catch (error) {
      console.error("Error deleting blog:", error)
      alert("Failed to delete blog")
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      tags: "",
      featuredImage: "",
      published: false,
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
    })
    setEditingBlog(null)
    setShowForm(false)
  }

  const insertFormatting = (format) => {
    const textarea = document.getElementById("content-editor")
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)

    let replacement = selectedText

    switch (format) {
      case "bold":
        replacement = `**${selectedText}**`
        break
      case "italic":
        replacement = `*${selectedText}*`
        break
      case "heading":
        replacement = `## ${selectedText}`
        break
      case "list":
        replacement = `- ${selectedText}`
        break
      case "link":
        const url = prompt("Enter URL:")
        if (url) replacement = `[${selectedText}](${url})`
        break
      case "image":
        const imageUrl = prompt("Enter Google Drive share link:")
        if (imageUrl) {
          const directUrl = convertGoogleDriveUrl(imageUrl)
          if (directUrl) {
            replacement = `![${selectedText || "Image"}](${directUrl})`
          } else {
            alert("Please enter a valid Google Drive share link")
            return
          }
        }
        break
    }

    const newContent = textarea.value.substring(0, start) + replacement + textarea.value.substring(end)
    setFormData((prev) => ({ ...prev, content: newContent }))

    // Focus back to textarea
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + replacement.length, start + replacement.length)
    }, 0)
  }

  if (loading && !showForm) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <AddIcon />
          Add New Blog
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">{editingBlog ? "Edit Blog" : "Create New Blog"}</h3>
            <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter blog title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Technology, Education"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of the blog post"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image (Google Drive Link)</label>
              <input
                type="url"
                value={formData.featuredImage}
                onChange={(e) => {
                  const url = e.target.value
                  if (url && isValidGoogleDriveUrl(url)) {
                    const directUrl = convertGoogleDriveUrl(url)
                    setFormData((prev) => ({ ...prev, featuredImage: directUrl || url }))
                  } else {
                    setFormData((prev) => ({ ...prev, featuredImage: url }))
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://drive.google.com/file/d/..."
              />
              <p className="mt-1 text-xs text-gray-500">
                Paste a Google Drive share link (e.g., https://drive.google.com/file/d/FILE_ID/view?usp=sharing)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>

              {/* Rich Text Toolbar */}
              <div className="flex flex-wrap gap-2 mb-2 p-2 bg-gray-50 rounded-t-lg border border-b-0">
                <button
                  type="button"
                  onClick={() => insertFormatting("bold")}
                  className="p-2 hover:bg-gray-200 rounded"
                  title="Bold"
                >
                  <FormatBoldIcon fontSize="small" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting("italic")}
                  className="p-2 hover:bg-gray-200 rounded"
                  title="Italic"
                >
                  <FormatItalicIcon fontSize="small" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting("heading")}
                  className="p-2 hover:bg-gray-200 rounded text-sm font-bold"
                  title="Heading"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting("list")}
                  className="p-2 hover:bg-gray-200 rounded"
                  title="Bullet List"
                >
                  <FormatListBulletedIcon fontSize="small" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting("link")}
                  className="p-2 hover:bg-gray-200 rounded"
                  title="Link"
                >
                  <LinkIcon fontSize="small" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting("image")}
                  className="p-2 hover:bg-gray-200 rounded"
                  title="Image"
                >
                  <ImageIcon fontSize="small" />
                </button>
              </div>

              <textarea
                id="content-editor"
                required
                value={formData.content}
                onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                rows={12}
                className="w-full px-4 py-2 border border-gray-300 rounded-b-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                placeholder="Write your blog content here. Use markdown formatting:&#10;&#10;## Heading&#10;**Bold text**&#10;*Italic text*&#10;- List item&#10;[Link text](URL)&#10;![Image alt](Google Drive URL)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="technology, education, career"
              />
            </div>

            {/* SEO Section */}
            <div className="border-t pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                  <input
                    type="text"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData((prev) => ({ ...prev, metaTitle: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="SEO title (leave empty to use blog title)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                  <textarea
                    value={formData.metaDescription}
                    onChange={(e) => setFormData((prev) => ({ ...prev, metaDescription: e.target.value }))}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="SEO description (leave empty to use excerpt)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Keywords</label>
                  <input
                    type="text"
                    value={formData.metaKeywords}
                    onChange={(e) => setFormData((prev) => ({ ...prev, metaKeywords: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="published" className="text-sm font-medium text-gray-700">
                  Publish immediately
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? "Saving..." : editingBlog ? "Update Blog" : "Create Blog"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Blog List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Blogs</h3>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <ArticleIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No blogs</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new blog post.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{blog.excerpt}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {blog.category || "Uncategorized"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          blog.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {blog.published ? (
                          <>
                            <VisibilityIcon className="w-3 h-3 mr-1" />
                            Published
                          </>
                        ) : (
                          <>
                            <VisibilityOffIcon className="w-3 h-3 mr-1" />
                            Draft
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{blog.views || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Edit"
                        >
                          <EditIcon fontSize="small" />
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete"
                        >
                          <DeleteIcon fontSize="small" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
