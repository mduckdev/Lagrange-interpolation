from mpl_toolkits.axisartist.axislines import AxesZero
import matplotlib.pyplot as plt
import numpy as np
import sys
x_points = []
y_points = []

for index, i in enumerate(sys.argv):
    if(index == 0):
        continue
    pair = i.split(",")
    x_points.append(float(pair[0]))
    y_points.append(float(pair[1]))


def interpolate_x_value(X):
    yp = 0
    for i in range(len(x_points)):
        p = 1
        for j in range(len(x_points)):
            if i != j:
                p = p * (X - x_points[j])/(x_points[i] - x_points[j])
        yp = yp + p * y_points[i]
    return yp


plt.rcParams["figure.figsize"] = [100, 100]
plt.rcParams["figure.autolayout"] = True
fig = plt.figure()
ax = fig.add_subplot(axes_class=AxesZero)
#ax.set_aspect('equal', adjustable='box')
figManager = plt.get_current_fig_manager()
#figManager.window.showMaximized()

for direction in ["xzero", "yzero"]:
    ax.axis[direction].set_axisline_style("-|>")

    ax.axis[direction].set_visible(True)

for direction in ["left", "right", "bottom", "top"]:
    ax.axis[direction].set_visible(False)

plt.plot(x_points, y_points, 'r*')

x = np.linspace(min(x_points)-len(x_points)*2,
                max(x_points)+len(x_points)*2, 200)

ax.plot(x, interpolate_x_value(x))


plt.show()
