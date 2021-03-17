function TreeNode(val) {
  this.parent = undefined
  this.value = val

  let children = []
  this.addChild = function (treeNode) {
    treeNode.setParent(this)
    children.push(treeNode)
  }
  this.getChildren = function () {
    return children
  }

  this.setParent = function (node) {
    this.parent = node
  }
}

function Tree(initialNode) {
  this.path = [initialNode]

  this.advance = function (node) {
    this.path.push(node)
  }
  this.reverse = function () {
    if (this.path.length === 1) return

    this.path = this.path.slice(0, this.path.length - 1)
  }

  this.getCurNode = function () {
    return this.path[this.path.length - 1]
  }
}
const inittn = new TreeNode("init")
inittn.addChild(new TreeNode("child"))
inittn.addChild(new TreeNode("child2"))
inittn.addChild(new TreeNode("child3"))

const tree = new Tree(inittn)

console.log(tree.getCurNode())
