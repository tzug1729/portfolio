import cv2
img = cv2.imread("./background.jpg", 0)
dst = cv2.adaptiveThreshold(
    img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 21, 5)
dst_dark = (dst * 0.7).astype("uint8")
cv2.imshow("adaptive21", dst_dark)
cv2.imwrite("dst.jpg", dst_dark)

cv2.waitKey(0)
cv2.destroyAllWindows()
