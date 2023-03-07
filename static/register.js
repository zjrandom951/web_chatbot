// 获取表单元素
const form = document.getElementById("register-form");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const confirmPasswordInput = document.getElementById("confirm-password-input");
const submitButton = document.getElementById("submit-button");

// 监听表单提交事件
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // 阻止表单默认提交行为

  // 获取表单数据
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  // 表单验证
  if (!username || !password || !confirmPassword) {
    alert("请填写完整的注册信息！");
    return;
  }
  if (password !== confirmPassword) {
    alert("两次输入的密码不一致！");
    return;
  }

  // 禁用提交按钮，防止用户多次点击
  submitButton.disabled = true;

  try {
    // 向后端发送注册请求
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "注册失败，请重试！");
    }

    alert("注册成功！");
    location.href = "/chat"; // 跳转到聊天页面
  } catch (error) {
    alert(error.message);
  } finally {
    submitButton.disabled = false;
  }
});
